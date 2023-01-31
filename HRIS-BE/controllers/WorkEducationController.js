const Workeducation = require("../models/Workeducation.js");
const Employee = require("../models/Employee.js");

module.exports.getWorkEducation = async (req, res) => {
    try {
        let result;
        
        if (req.query.id) {
            result = await Workeducation.findOne({
                where: {
                    id: req.query.id
                }
            });
            result = [result];
        }else if(req.query.id_employee) {
            result = await Workeducation.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }
        else {
            result = await Workeducation.findAll({
                where: {
                    employeeId: req.userData.employee.id
                }
            });
        }
        
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.addWorkEducation = async (req, res) => {
    try {
        let result;
        
        if(req.query.id_employee) {
            result = await Workeducation.create({
            employeeId: req.query.id_employee,
            education_id: req.body.education_id,
            level: req.body.level,
            institute: req.body.institute,
            major: req.body.major,
            year: req.body.year,
            gap: req.body.gap,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        })
        }else {
            result = await Workeducation.create({
            employeeId: req.userData.employee.id,
            education_id: req.body.education_id,
            level: req.body.level,
            institute: req.body.institute,
            major: req.body.major,
            year: req.body.year,
            gap: req.body.gap,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        })
        }
        
        res.status(201).json(result ? {
            status: 201,
            message: "Success Create"
        } : {
            message: "Error Create"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.deleteWorkEducation = async (req, res) => {
    try {
        const result = await Workeducation.destroy({
            where: {
                id: req.query.id
            }
        })
        res.status(200).json(result ? {
            status: 200,
            message: "Success deleting"
        } : {
            message: "Error Deleting"
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.updateWorkEducation = async (req, res) => {
    try {
        const result = await Workeducation.update({
            education_id: req.body.education_id,
            level: req.body.level,
            institute: req.body.institute,
            major: req.body.major,
            year: req.body.year,
            gap: req.body.gap,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        }, {
            where: {
                id: req.body.id
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
}