const Employee = require("../models/Employee.js")
const ReportMethod = require("../models/ReportMethod.js")
const Report = require("../models/Report.js")
const TerminationReason = require("../models/TerminationReason.js")
const EmployeeStatus = require("../models/Employeestatus.js")
const {JobTitle} = require("../models/JobModels.js")
const User = require("../models/User.js")
const Emergencycontact = require("../models/Emergencycontact.js")
const Dependent = require("../models/Dependent.js")
const Immigration = require("../models/Immigration.js")
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

module.exports.getUserEmergencyContact = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Emergencycontact.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }else if(req.params.id) {
            data = await Emergencycontact.findOne({
                where: {
                    id: req.params.id
                }
            });
        }else {
            data = await Emergencycontact.findAll({
                where: {
                    employeeId: req.userData.employee.id
                }
            });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.addEmergencyContact = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Emergencycontact.create({
                employeeId: req.query.id_employee,
                name: req.body.name,
                relationship: req.body.relationship,
                phone: req.body.phone,
                mobilePhone: req.body.mobilePhone
            });
        }else {
            data = await Emergencycontact.create({
                employeeId: req.userData.employee.id,
                name: req.body.name,
                relationship: req.body.relationship,
                phone: req.body.phone,
                mobilePhone: req.body.mobilePhone
            });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.updateEmergencyContact = async (req, res) => {
    try {
        
        const data = await Emergencycontact.update({
            name: req.body.name,
            relationship: req.body.relationship,
            phone: req.body.phone,
            mobilePhone: req.body.mobilePhone
        }, {where: {id: req.body.id}});
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.deleteEmergencyContact = async (req, res) => {
    try {
        
        const data = await Emergencycontact.destroy({
            where: {
                id: req.query.id,
            }
        });
        
        res.status(200).json({
            status: 200,
            message: "Success delete entry"
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}


module.exports.getUserDependent = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Dependent.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }else {
            data = await Dependent.findAll({
            where: {
                employeeId: req.userData.employee.id
            }
        });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.addUserDependent = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Dependent.create({
                employeeId: req.query.id_employee,
                name: req.body.name,
                relationship: req.body.relationship,
                birthDate: req.body.birthDate
            });
        }else {
            data = await Dependent.create({
                employeeId: req.userData.employee.id,
                name: req.body.name,
                relationship: req.body.relationship,
                birthDate: req.body.birthDate
            });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.updateUserDependent = async (req, res) => {
    try {
        
        const data = await Dependent.update({
            name: req.body.name,
            relationship: req.body.relationship,
            birthDate: req.body.birthDate
        }, {where: {id: req.body.id}});
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.deleteUserDependent = async (req, res) => {
    try {
        
        const data = await Dependent.destroy({
            where: {
                id: req.query.id,
            }
        });
        
        res.status(200).json({
            status: 200,
            message: "Success delete entry"
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}


module.exports.getUserImmigration = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Immigration.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
        }else {
            data = await Immigration.findAll({
                where: {
                    employeeId: req.userData.employee.id
                }
            });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.addUserImmigration = async (req, res) => {
    try {
        
        let data;
        
        if(req.query.id_employee) {
            data = await Immigration.create({
                employeeId: req.query.id_employee,
                documentType: req.body.documentType,
                number: req.body.number,
                issueDate: req.body.issueDate,
                expiryDate: req.body.expiryDate,
                eligibleStatus: req.body.eligibleStatus,
                issuedby: req.body.issuedby,
                eligileIssueDate: req.body.eligileIssueDate,
                comment: req.body.comment,
            });
        }else {
            data = await Immigration.create({
                employeeId: req.userData.employee.id,
                documentType: req.body.documentType,
                number: req.body.number,
                issueDate: req.body.issueDate,
                expiryDate: req.body.expiryDate,
                eligibleStatus: req.body.eligibleStatus,
                issuedby: req.body.issuedby,
                eligileIssueDate: req.body.eligileIssueDate,
                comment: req.body.comment,
            });
        }
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.updateUserImmigration = async (req, res) => {
    try {
        
        const data = await Immigration.update({
            documentType: req.body.documentType,
            number: req.body.number,
            issueDate: req.body.issueDate,
            expiryDate: req.body.expiryDate,
            eligibleStatus: req.body.eligibleStatus,
            issuedby: req.body.issuedby,
            eligileIssueDate: req.body.eligileIssueDate,
            comment: req.body.comment,
        }, {where: {id: req.body.id}});
        
        res.status(200).json({
            status: 200,
            result: data
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.deleteUserImmigration = async (req, res) => {
    try {
        
        const data = await Immigration.destroy({
            where: {
                id: req.query.id,
            }
        });
        
        res.status(200).json({
            status: 200,
            message: "Success delete entry"
        })
        
    }catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}
