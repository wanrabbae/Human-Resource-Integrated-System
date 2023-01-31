const ReportTo = require("../models/ReportTo.js");
const ReportMethod = require("../models/ReportMethod.js");

module.exports.getReportTo = async (req, res) => {
    try {
        let result;
        
        if(req.query.id) {
            result = await ReportTo.findOne({
            where: {
                id: req.query.id,
            },
            include: {
                model: ReportMethod,
            }
            
        });
        }else if(req.query.id_employee) {
            result = await ReportTo.findAll({
                where: {
                    employeeId: req.query.id_employee,
                },
                include: {
                    model: ReportMethod,
                }
                
            });
        }
        else {
            result = await ReportTo.findAll({
                where: {
                    employeeId: req.userData.employee.id,
                },
                include: {
                    model: ReportMethod,
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

module.exports.addReportTo = async (req, res) => {
    try {
        let result; 
        
        
        if(req.query.id_employee) {
            result = await ReportTo.create({
                name: req.body.name,
                status: req.body.status,
                reporting_method_id: req.body.reporting_method_id,
                structureId: req.body.structureId,
                employeeId: req.query.id_employee,
                reportToEmployee: req.body.reportToEmployee,
            })
        }else {
            result = await ReportTo.create({
                name: req.body.name,
                status: req.body.status,
                reporting_method_id: req.body.reporting_method_id,
                structureId: req.body.structureId,
                employeeId: req.userData.employee.id,
                reportToEmployee: req.body.reportToEmployee,
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

module.exports.deleteReportTo = async (req, res) => {
    try {
        const result = await ReportTo.destroy({
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

module.exports.updateReportTo = async (req, res) => {
    try {
        const result = await ReportTo.update({
            name: req.body.name,
            status: req.body.status,
            reporting_method_id: req.body.reporting_method_id,
            structureId: req.body.structureId,
            reportToEmployee: req.body.reportToEmployee,
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