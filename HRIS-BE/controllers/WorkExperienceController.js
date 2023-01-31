const Workexperience = require("../models/Workexperience.js");
const Employee = require("../models/Employee.js");

module.exports.getWorkexperience = async (req, res) => {
    try {
        let result;
        
        if(req.query.id) {
            result = await Workexperience.findOne({
                        
                        where: {
                            id: req.query.id
                        }
                    });
            result = [result];
        }else if(req.query.id_employee) {
            result = await Workexperience.findAll({
                
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }
        else {
            result = await Workexperience.findAll({
                
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

module.exports.addWorkexperience = async (req, res) => {
    try {
        let result;
        
        if(req.query.id_employee) {
            result = await Workexperience.create({
            employeeId: req.query.id_employee,
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            comment: req.body.comment,
        })
        }else {
            result = await Workexperience.create({
                employeeId: req.userData.employee.id,
                companyName: req.body.companyName,
                jobTitle: req.body.jobTitle,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                comment: req.body.comment,
            })
        }
        
        res.json(result ? {
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

module.exports.deleteWorkexperience = async (req, res) => {
    try {
        const result = await Workexperience.destroy({
            where: {
                id: req.query.id
            }
        })
        res.json(result ? {
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

module.exports.updateWorkexperience = async (req, res) => {
    try {
        const result = await Workexperience.update({
            companyName: req.body.companyName,
            jobTitle: req.body.jobTitle,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            comment: req.body.comment,
        }, {
            where: {
                id: req.body.id
            }
        });

        res.json(result ? {
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