const EthosGalery = require("../../models/ethos/EthosGalery.js");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

module.exports.getGalery = async (req, res) => {
    try {
        let result;
        
        if(req.query.keyword) {
            result = await EthosGalery.findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }
            });
        }else {
            result = await EthosGalery.findAll({order: [["id", "DESC"]]});
        }
        
        result.forEach(res => {
            res.photo = 
                res.photo != "" || res.photo != null ? 
                `${req.protocol}://${req.get('host')}/assets/ethos/${res.photo}`
                : null
        })
        
        res.status(200).json({
            status: 200,
            data: result,
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports.addGalery = async (req, res) => {
    try {
        let rename = null;
        
        if(!req.file) {
            return res.status(400).json({
                status: 400,
                message: "photo is required"
            })
        }
        
        const tempPath = req.file.path;
        rename = req.file.filename + "." + req.file.mimetype.split("/")[1];
        const targetPath = path.join(`assets/ethos/${rename}`);
        fs.rename(tempPath, targetPath, (err) => {
            if (err) return handleError(err, res);
        });
        
        const result = await EthosGalery.create({
            title: req.body.title,
            description: req.body.description,
            photo: rename,
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

module.exports.deleteGalery = async (req, res) => {
    try {
        const data = await EthosGalery.findOne({
            where: {
                id: req.query.id,
            },
        });
        
        if(data.photo) {
            fs.unlink(`assets/ethos/${data.photo}`,(err) => {
                if (err) throw err;
            });
        }
        
        const result = await EthosGalery.destroy({
            where: {
                id: req.query.id
            }
        });
        res.status(200).json({ message: 'success delete brand' });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        })
    }
}

module.exports.updateGalery = async (req, res) => {
    try {
        const data = await EthosGalery.findOne({where: {
            id: req.body.id,
        }})
        if (req.file) {
            fs.unlink(`assets/ethos/${data.photo}`, (err) => {
                  if (err) throw err;
                  console.log('path/file.txt was deleted');
            })
            const tempPath = req.file.path;
            const rename = `${req.file.filename}.${req.file.mimetype.split("/")[1]}`;
            const targetPath = path.join(`assets/ethos/${rename}`);
            fs.rename(tempPath, targetPath, (err) => {
                if (err) return handleError(err, res);
            });
            await EthosGalery.update({
                title: req.body.title,
                description: req.body.description,
                photo: rename,
            }, {
                where: {
                    id: req.body.id
                },
            },);
        } else {
            await EthosGalery.update({
                title: req.body.title,
                description: req.body.description,
            }, {
                where: {
                    id: req.body.id
                },
            },);
        }
        res.status(200).json({ message: 'success edited brand' });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
        });
    }
}