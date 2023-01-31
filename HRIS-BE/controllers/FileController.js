const Files = require("../models/File.js");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

module.exports.getFile = async (req, res) => {
    try {
        let result;
        
        if(req.query.keyword) {
            result = await Files.findAll({
                where: {
                    employeeId: req.userData.employee.id,
                    filename: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }
            });
            result.forEach(res => {
                res.file = 
                    res.file != "" || res.file != null ? 
                    `${req.protocol}://${req.get('host')}/assets/employee/${res.file}`
                    : null
            })
        }else if (req.query.id) {
            result = await Files.findOne({
                where: {
                    id: req.query.id,
                }
            });
            result.file = result.file != "" || result.file != null ? 
                    `${req.protocol}://${req.get('host')}/assets/employee/${result.file}`
                    : null
        }else if(req.query.type) {
            result = await Files.findAll({
                order: [["id", "DESC"]],
                where: {
                    employeeId: req.userData.employee.id,
                    type: req.query.type
                }
            });
            result.forEach(res => {
                res.file = 
                    res.file != "" || res.file != null ? 
                    `${req.protocol}://${req.get('host')}/assets/employee/${res.file}`
                    : null
            })
        }
        else {
            result = await Files.findAll({
                order: [["id", "DESC"]],
                where: {
                    employeeId: req.userData.employee.id,
                }
            });
            result.forEach(res => {
                res.file = 
                    res.file != "" || res.file != null ? 
                    `${req.protocol}://${req.get('host')}/assets/employee/${res.file}`
                    : null
            })
        }
        
        
        res.status(200).json({
            status: 200,
            result: result,
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports.addFile = async (req, res) => {
    try {
        let rename = null;
        

            const tempPath = req.file.path;
            const targetPath = path.join(`assets/employee/${req.file.originalname}`);
            fs.rename(tempPath, targetPath, (err) => {
                if (err) return handleError(err, res);
            });
        
        const result = await Files.create({
            file: req.file.originalname,
            type: req.file.mimetype.split("/")[1],
            filename: req.file.originalname,
            size: req.file.size,
            employeeId: req.userData.employee.id,
        });
        
        res.status(201).json({
            message: "success",
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}

module.exports.deleteFile = async (req, res) => {
    try {
        const data = await Files.findOne({
            where: {
                id: req.query.id,
            },
        });
        
        if(data.file) {
            fs.unlink(`assets/employee/${data.file}`,(err) => {
                if (err) throw err;
            });
        }
        
        const result = await Files.destroy({
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ message: 'success delete file' });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err.toString(),
        })
    }
}