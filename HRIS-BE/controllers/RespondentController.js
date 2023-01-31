const Respondent = require("../models/Respondent.js");
const Employee = require("../models/Employee.js");
const { JobPosition } = require("../models/JobModels.js");
const { Document } = require("../models/Document");
const ReportTo = require("../models/ReportTo.js")
const { pushInbox } = require("./InboxController.js");
const { Op } = require("sequelize");

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

const getHistoryDoc = async (req, res) => {
  try {
    let result;

    if (req.query.status) {
      result = await Respondent.findAll({
        where: {
          employeeId: req.userData.employee.id,
          status: req.query.status
        },
        include: [
          {
            model: Document,
            as: "documents",

          },
        ],
        raw: true,
        nest: true
      });
    } else {
      result = await Respondent.findAll({
        where: {
          employeeId: req.userData.employee.id,
        },
        include: [
          {
            model: Document,
            as: "documents",

          },
        ],
        raw: true,
        nest: true
      });
    }

    return res.jsonData(result.map(res => {
      return {
        id: res.id,
        document_id: res.document_id,
        status: res.status,
        date: res.date,
        document_title: res.documents.title,
        document_desc: res.documents.description,
      }
    }));
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addRespondent = async (req, res) => {
  try {
    const findDoc = await Document.findOne({
      where: {
        id: req.body.document_id,
      },
      attributes: ["id", "title"]
    });
    const result = await Respondent.create({
      document_id: req.body.document_id,
      employeeId: req.body.employeeId,
      jobposition_id: req.body.jobposition_id,
      unique_id: req.userData.unique_id,
      type: findDoc.title,
      time:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
    });

    const spv = await ReportTo.findAll({
      where: {
        employeeId: req.body.employeeId
      },
      attributes: ["id", "employeeId", "reportToEmployee"],
      raw: true,
      nest: true,
    });

    if (spv && spv.length > 0) {
      spv.map(async (sp) => {
        await pushInbox({
          unique_id: req.userData.unique_id,
          to_employee: sp.reportToEmployee,
          employeeId: req.body.employeeId,
          title: `New Document ${findDoc.title} Request`,
          link: "/inbox/approval-list",
          type: "approval"
        })
      })
    }

    return res.jsonSuccessCreated("Success create Respondent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateRespondent = async (req, res) => {
  try {
    const result = await Respondent.update({
      status: req.body.status,
    }, {
      where: {
        id: req.params.id
      }
    });

    return res.jsonSuccessCreated("Success update Respondent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
}

const deleteRespondent = async (req, res) => {
  try {
    const result = await Respondent.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Respondent");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllRespondent,
  addRespondent,
  deleteRespondent,
  updateRespondent,
  getHistoryDoc
};
