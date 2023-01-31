const Leave = require("../models/Leave.js");
const LeaveType = require("../models/LeaveType.js");
const ReportTo = require("../models/ReportTo.js");
const Employee = require("../models/Employee.js");
const Emergencycontact = require("../models/Emergencycontact.js");
const { JobPosition } = require("../models/JobModels.js");
const { pushInbox } = require("./InboxController.js")
const { Op } = require("sequelize");

// pagination function
const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: requests } = data;
  const currentPage = page ? +parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, requests, totalPages, currentPage };
};

const getAllLeave = async (req, res) => {
  try {
    let result = []
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    if (req.query.keyword) {
      result = await Leave.findAndCountAll({
        limit,
        offset,
        include: [
          { model: LeaveType, as: "leave_type" },
          {
            model: Employee,
            as: "employee",
            where: {
              firstName: {
                [Op.like]: `%${req.query.keyword}%`
              }
            }
          },
          { model: Employee, as: "delegated_employee" },
          { model: Emergencycontact, as: "emergency_contact" },
          { model: JobPosition, as: "jobposition" },
        ],
      });
    } else if (req.query.date) {
      result = await Leave.findAndCountAll({
        where: {
          start_date: new Date(req.query.date),
        },
        limit,
        offset,
        include: [
          { model: LeaveType, as: "leave_type" },
          { model: Employee, as: "employee" },
          { model: Employee, as: "delegated_employee" },
          { model: Emergencycontact, as: "emergency_contact" },
          { model: JobPosition, as: "jobposition" },
        ],
      });
    } else {
      result = await Leave.findAndCountAll({
        where: {
          unique_id: req.userData.unique_id,
          unique_id: {
            [Op.like]: `${req.userData.unique_id}%`
          }
        },
        limit,
        offset,
        include: [
          { model: LeaveType, as: "leave_type" },
          { model: Employee, as: "employee" },
          { model: Employee, as: "delegated_employee" },
          { model: Emergencycontact, as: "emergency_contact" },
          { model: JobPosition, as: "jobposition" },
        ],
      });
    }
    let response = getPagingData(result, page, limit);
    return res.jsonData(response);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getLeave = async (req, res) => {
  try {
    const result = await Leave.findByPk(req.params.id, {
      include: [
        { model: LeaveType, as: "leave_type" },
        { model: Employee, as: "employee" },
        { model: Employee, as: "delegated_employee" },
        { model: Emergencycontact, as: "emergency_contact" },
        { model: JobPosition, as: "jobposition" },
      ],
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addLeave = async (req, res) => {
  try {
    const result = await Leave.create({
      employeeId: req.body.employeeId,
      jobposition_id: req.body.jobposition_id,
      leave_type_id: req.body.leave_type_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      leave_duration: req.body.leave_duration,
      remaining_days: req.body.remaining_days,
      note: req.body.note,
      delegated_to: req.body.delegated_to,
      delegated_task: req.body.delegated_task,
      emergencycontact_id: req.body.emergencycontact_id,
      unique_id: req.userData.unique_id
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
          title: "New Time Off Request Of Leave",
          link: "/inbox/approval-list",
          type: "approval"
        })
      })
    }

    return res.jsonSuccessCreated("Success create Leave");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteLeave = async (req, res) => {
  try {
    const result = await Leave.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Leave");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateLeave = async (req, res) => {
  try {
    const result = await Leave.update(
      {
        employeeId: req.body.employeeId,
        jobposition_id: req.body.jobposition_id,
        leave_type_id: req.body.leave_type_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        leave_duration: req.body.leave_duration,
        remaining_days: req.body.remaining_days,
        note: req.body.note,
        delegated_to: req.body.delegated_to,
        delegated_task: req.body.delegated_task,
        emergencycontact_id: req.body.emergencycontact_id,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Leave");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAllLeaveType = async (req, res) => {
  try {
    const result = await LeaveType.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getLeaveType = async (req, res) => {
  try {
    const result = await LeaveType.findByPk(req.params.id);
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addLeaveType = async (req, res) => {
  try {
    const result = await LeaveType.create({
      name: req.body.name,
      max_duration: req.body.max_duration,
      submission_before: req.body.submission_before,
      unique_id: req.userData.unique_id,
    });

    return res.jsonSuccessCreated("Success create LeaveType");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteLeaveType = async (req, res) => {
  try {
    const result = await LeaveType.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete LeaveType");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateLeaveType = async (req, res) => {
  try {
    const result = await LeaveType.update(
      {
        name: req.body.name,
        max_duration: req.body.max_duration,
        submission_before: req.body.submission_before,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update LeaveType");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllLeave,
  getLeave,
  addLeave,
  deleteLeave,
  updateLeave,
  getAllLeaveType,
  getLeaveType,
  addLeaveType,
  updateLeaveType,
  deleteLeaveType,
};
