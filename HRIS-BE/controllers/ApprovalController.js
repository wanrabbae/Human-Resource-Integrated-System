const Op = require("sequelize").Op;
const Leave = require("../models/Leave.js")
const Respondent = require("../models/Respondent.js")
const { JobPosition } = require("../models/JobModels.js");
const Employee = require("../models/Employee.js")
const { pushInbox } = require("./InboxController.js")
const { RBSetting, CASetting, LoanSetting, Reimbursement, CashAdvance, Loan } = require("../models/FinanceModels.js")
const { Document } = require("../models/Document");
const Permission = require("../models/Permisssions.js")
const Overtime = require("../models/Overtime.js")

const getAllRespondent = async (req, res) => {
  try {
    const result = await Respondent.findAll({
      where: req.query.document_id
        ? {
          document_id: req.query.document_id,
        }
        : {
          unique_id: req.userData.unique_id,
        },
      include: [
        { model: Employee, as: "employee" },
        { model: JobPosition, as: "jobposition" },
      ],
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateRespondent = async (req, res) => {
  try {
    const findRes = await Respondent.findByPk(req.params.id);
    const findDoc = await Document.findByPk(findRes.document_id, {
      attributes: ["id", "title"]
    });
    const result = await Respondent.update({
      status: req.body.status,
    }, {
      where: {
        id: req.params.id
      }
    });

    await pushInbox({
      unique_id: req.userData.unique_id,
      to_employee: findRes.employeeId,
      employeeId: req.userData.employee.id,
      title: `Document ${findDoc.title} has been ${req.body.status == "rejected" ? "rejected" : "approved"}`,
      message: `Your Document ${findDoc.title} has been ${req.body.status == "rejected" ? "rejected" : "approved"}`
    })

    return res.jsonSuccessCreated("Success update Respondent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
}

const updateStatusFinances = async (req, res) => {
  try {
    switch (req.body.type) {
      case "Reimbursment":
        const find = await Reimbursement.findOne({
          where: { id: req.body.id },
        })

        await Reimbursement.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: find.employeeId,
          employeeId: req.userData.employee.id,
          title: `Reimbursement has been ${req.body.status == "rejected" ? "rejected" : "approved"}`,
          message: `Reimbursement of funds has been ${req.body.status == "rejected" ? "rejected" : "approved"} on ${new Date().toDateString()} amounting to Rp. ${find.amount} and has been sent to your bank account.`
        })

        break;

      case "Cash Advance":
        const findCA = await CashAdvance.findOne({
          where: { id: req.body.id },
        })

        await CashAdvance.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: findCA.employeeId,
          employeeId: req.userData.employee.id,
          title: `Cash Advance has been ${req.body.status == "rejected" ? "rejected" : "approved"}`,
          message: `Cash Advance request has been ${req.body.status == "rejected" ? "rejected" : "approved"} on ${new Date().toDateString()} amounting to Rp. ${findCA.amount}`
        })

        break;

      case "Loan":
        const findLoan = await Loan.findOne({
          where: { id: req.body.id },
        })

        await Loan.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: findLoan.employeeId,
          employeeId: req.userData.employee.id,
          title: `Loan has been ${req.body.status == "rejected" ? "rejected" : "approved"}`,
          message: `Loan request has been ${req.body.status == "rejected" ? "rejected" : "approved"} on ${new Date().toDateString()} amounting to Rp. ${findLoan.amount}`
        })

        break;

      default:

        break;
    }
    return res.jsonSuccess("Success update status");
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

const recapData = async (req, res) => {
  try {
    let data = []
    // const q = `SELECT * FROM finance_reimbursement, finance_cash_advance, finance_loan`
    const rem = await Reimbursement.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      },
      attributes: ["id", "createdAt", "status"]
    })

    const ca = await CashAdvance.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      }, attributes: ["id", "createdAt", "status"]
    })

    const loan = await Loan.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      },
      attributes: ["id", "createdAt", "status"]
    })

    rem.map(r => data.push({ ...r, type: "Reimbursment" }))
    ca.map(c => data.push({ ...c, type: "Cash Advance" }))
    loan.map(l => data.push({ ...l, type: "Loan" }))

    return res.jsonData(data.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt) ? 1 : -1
    }))
    // return res.jsonData(_.sortBy(data, 'createdAt'))
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

const updateStatusTimes = async (req, res) => {
  try {
    switch (req.body.type) {
      case "Overtime":
        await Overtime.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        break;

      case "Permission":
        await Permission.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        break;

      case "Leave":
        await Leave.update({
          status: req.body.status
        }, { where: { id: req.body.id } })

        break;

      default:

        break;
    }
    return res.jsonSuccess("Success update status times");
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

const recapDataTime = async (req, res) => {
  try {
    let data = []
    // const q = `SELECT * FROM finance_reimbursement, finance_cash_advance, finance_loan`
    const leave = await Leave.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      },
      attributes: ["id", "date", "status"],
      raw: true,
      nest: true,
    })

    console.log("LEAVE: ", leave);

    const overtime = await Overtime.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      }, attributes: ["id", ["overtimeSubmissionDate", "date"], "status"]
    })

    const permission = await Permission.findAll({
      where: { unique_id: req.userData.unique_id },
      raw: true,
      nest: true,
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
        as: "employee",
        include: {
          model: JobPosition,
          attributes: ["id", "job_id"]
        }
      },
      attributes: ["id", ["dateOfFiling", "date"], "status"]
    })

    leave.map(r => data.push({ ...r, type: "Leave" }))
    overtime.map(c => data.push({ ...c, type: "Overtime" }))
    permission.map(l => data.push({ ...l, type: "Permission" }))

    return res.jsonData(data.sort((a, b) => {
      return new Date(a.date) - new Date(b.date) ? 1 : -1
    }))
    // return res.jsonData(_.sortBy(data, 'createdAt'))
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

module.exports = {
  getAllRespondent,
  updateRespondent,
  recapData,
  recapDataTime,
  updateStatusFinances,
  updateStatusTimes
}