const Worklicense = require("../models/Worklicence.js");
const Employee = require("../models/Employee.js");

module.exports.getWorkLicense = async (req, res) => {
    try {
        let result;
        
        if (req.query.id) {
            result = await Worklicense.findOne({
                where: {
                    id: req.query.id
                }
            });
            result = [result];
        } else if(req.query.id_employee) {
            result = await Worklicense.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }
        else {
            result = await Worklicense.findAll({
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

module.exports.addWorkLicense = async (req, res) => {
    try {
        let result;
        
        if(req.query.id_employee) {
            result = await Worklicense.create({
            employeeId: req.query.id_employee,
            licenseType: req.body.licenseType,
            licenseNumber: req.body.licenseNumber,
            issuedDate: req.body.issuedDate,
            expiryDate: req.body.expiryDate,
        })
        }else {
            result = await Worklicense.create({
            employeeId: req.userData.employee.id,
            licenseType: req.body.licenseType,
            licenseNumber: req.body.licenseNumber,
            issuedDate: req.body.issuedDate,
            expiryDate: req.body.expiryDate,
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

module.exports.deleteWorkLicense = async (req, res) => {
    try {
        const result = await Worklicense.destroy({
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

module.exports.updateWorkLicense = async (req, res) => {
    try {
        const result = await Worklicense.update({
            licenseType: req.body.licenseType,
            licenseNumber: req.body.licenseNumber,
            issuedDate: req.body.issuedDate,
            expiryDate: req.body.expiryDate,
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