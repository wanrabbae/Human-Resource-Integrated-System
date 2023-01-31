const Overtime = require("../models/Overtime.js");
const Employee = require("../models/Employee.js");
const EmployeeStatus = require("../models/Employeestatus.js");
const ReportTo = require("../models/ReportTo.js");
const { JobPosition } = require("../models/JobModels.js");
const { Op } = require("sequelize");
const { pushInbox } = require("./InboxController.js")

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

// GET
module.exports.getOvertime = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        let data = []

        if (req.query.keyword) {
            data = await Overtime.findAndCountAll({
                raw: true,
                nest: true,
                limit,
                offset,
                where: {
                    [Op.or]: [
                        {
                            unique_id: req.userData.unique_id,
                        },
                    ],
                },
                include: {
                    model: Employee,
                    where: {
                        firstName: {
                            [Op.like]: `%${req.query.keyword}%`
                        }
                    },
                    include: [
                        {
                            model: EmployeeStatus,
                        },
                        {
                            model: JobPosition,
                        }
                    ]
                }
            });
        } else if (req.query.date) {
            data = await Overtime.findAndCountAll({
                raw: true,
                nest: true,
                limit,
                offset,
                where: {
                    overtimeOnDate: new Date(req.query.date),
                    [Op.or]: [
                        {
                            unique_id: req.userData.unique_id,
                        },
                    ],
                },
                include: {
                    model: Employee,
                    include: [
                        {
                            model: EmployeeStatus,
                        },
                        {
                            model: JobPosition,
                        }
                    ]
                }
            });
        } else {
            data = await Overtime.findAndCountAll({
                raw: true,
                nest: true,
                limit,
                offset,
                where: {
                    [Op.or]: [
                        {
                            unique_id: req.userData.unique_id,
                        },
                    ],
                },
                include: {
                    model: Employee,
                    include: [
                        {
                            model: EmployeeStatus,
                        },
                        {
                            model: JobPosition,
                        }
                    ]
                }
            });
        }

        let response = getPagingData(data, page, limit);
        return res.jsonData(response);
    } catch (err) {
        return res.serverError("Internal server error: " + err.toString());
    }
};

module.exports.getSingleOvertime = async (req, res) => {
    try {
        let data = await Overtime.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Employee,
                include: [
                    {
                        model: EmployeeStatus,
                    },
                    {
                        model: JobPosition,
                    }
                ]
            }
        });
        return res.jsonData(data);
    } catch (err) {
        return res.serverError("Internal server error: " + err.toString());
    }
};

// ADD
module.exports.addOvertime = async (req, res) => {
    try {
        const result = await Overtime.create({
            employeeId: req.body.employeeId,
            job_id: req.body.job_id,
            overtimeSubmissionDate: req.body.overtimeSubmissionDate,
            startTime: req.body.startTime,
            overtimeOnDate: req.body.overtimeOnDate,
            endTime: req.body.endTime,
            description: req.body.description,
            unique_id: req.userData.unique_id,
            status: req.body.status,
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
                    title: "New Time Off Request Of Overtime",
                    link: "/inbox/approval-list",
                    type: "approval"
                })
            })
        }

        return res.jsonSuccessCreated("Success Creating");
    } catch (err) {
        return res.serverError("Internal server error: " + err.toString());
    }
};

// UPDATE
module.exports.updateOvertime = async (req, res) => {
    try {
        const result = await Overtime.update(
            {
                employeeId: req.body.employeeId,
                job_id: req.body.job_id,
                overtimeSubmissionDate: req.body.overtimeSubmissionDate,
                startTime: req.body.startTime,
                overtimeOnDate: req.body.overtimeOnDate,
                endTime: req.body.endTime,
                description: req.body.description,
                status: req.body.status,
            }, {
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(result ? {
            status: 200,
            message: "Success Updating"
        } : {
            message: "Error Updating"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
};

// DELETE
module.exports.deleteOvertime = async (req, res) => {
    try {
        const result = await Overtime.destroy({
            where: {
                id: req.params.id,
            },
        });
        return res.jsonSuccess("Success Delete Data Overtime");
    } catch (err) {
        return res.serverError("Internal server error: " + err.toString());
    }
};