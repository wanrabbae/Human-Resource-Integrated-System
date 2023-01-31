const Worklanguage = require("../models/Worklanguage.js");

module.exports.getWorkLanguage = async (req, res) => {
    try {
        let result;
        
        if (req.query.id) {
            result = await Worklanguage.findOne({
                where: {
                    id: req.query.id
                }
            });
            // result.fluency = JSON.parse(result.fluency);
            result = [result];
        }else if(req.query.id_employee) {
            result = await Worklanguage.findAll({
                where: {
                    employeeId: req.query.id_employee
                }
            });
            // result.map(res => {
            //     res.fluency = res.fluency != null ? res.fluency = JSON.parse(res.fluency) : null
            // })
        }
        else {
            result = await Worklanguage.findAll({
                where: {
                    employeeId: req.userData.employee.id
                }
            });
            // result.map(res => {
            //     res.fluency = res.fluency != null ? res.fluency = JSON.parse(res.fluency) : null
            // })
        }
        
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err.toString(),
        })
    }
}

module.exports.addWorkLanguage = async (req, res) => {
    try {
        let result;
        
        if(req.query.id_employee) {
            result = await Worklanguage.create({
            employeeId: req.query.id_employee,
            language_id: req.body.language_id,
            fluency: req.body.fluency,
            competency: req.body.competency,
            comment: req.body.comment,
        })
        }else {
            result = await Worklanguage.create({
            employeeId: req.userData.employee.id,
            language_id: req.body.language_id,
            fluency: req.body.fluency,
            competency: req.body.competency,
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
        console.log(err)
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error: err,
        })
    }
}

module.exports.deleteWorkLanguage = async (req, res) => {
    try {
        const result = await Worklanguage.destroy({
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

module.exports.updateWorkLanguage = async (req, res) => {
    try {
        const result = await Worklanguage.update({
            language_id: req.body.language_id,
            fluency: req.body.fluency,
            competency: req.body.competency,
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