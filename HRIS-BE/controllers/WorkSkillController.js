const Workskill = require("../models/Workskill.js");

module.exports.getWorkSkill = async (req, res) => {
    try {
        let result;
        
        if (req.query.id) {
            result = await Workskill.findOne({
                where: {
                    id: req.query.id
                }
            });
            result = [result];
        }else if(req.query.id_employee) {
            result = await Workskill.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }
        else {
            result = await Workskill.findAll({
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

module.exports.addWorkSkill = async (req, res) => {
    try {
        let result;
        
        if(req.query.id_employee) {
            result = await Workskill.create({
                employeeId: req.query.id_employee,
                skill_id: req.body.skill_id,
                yearsOfExperience: req.body.yearsOfExperience,
                comment: req.body.comment,
            })
        }else {
            result = await Workskill.create({
                employeeId: req.userData.employee.id,
                skill_id: req.body.skill_id,
                yearsOfExperience: req.body.yearsOfExperience,
                comment: req.body.comment,
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

module.exports.deleteWorkSkill = async (req, res) => {
    try {
        const result = await Workskill.destroy({
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

module.exports.updateWorkSkill = async (req, res) => {
    try {
        const result = await Workskill.update({
            skill_id: req.body.skill_id,
            yearsOfExperience: req.body.yearsOfExperience,
            comment: req.body.comment,
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