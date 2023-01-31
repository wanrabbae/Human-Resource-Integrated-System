const EthosBrand = require("../../models/ethos/EthosBrand.js");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

module.exports.getBrands = async (req, res) => {
    try {
        let result;
        
        if(req.query.keyword) {
            result = await EthosBrand.findAll({
                where: {
                    title: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }
            });
        }else {
            result = await EthosBrand.findAll({order: [["id", "DESC"]]});
        }
        
        result.forEach(res => {
            res.image = 
                res.image != "" || res.image != null ? 
                `${req.protocol}://${req.get('host')}/assets/ethos/${res.image}`
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

module.exports.addBrands = async (req, res) => {
    try {
        let rename = null;
        
        if(req.file) {
            const tempPath = req.file.path;
            rename = req.file.filename + "." + req.file.mimetype.split("/")[1];
            const targetPath = path.join(`assets/ethos/${rename}`);
            fs.rename(tempPath, targetPath, (err) => {
                if (err) return handleError(err, res);
            });
        }
        
        const result = await EthosBrand.create({
            title: req.body.title,
            description: req.body.description,
            image: rename,
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

module.exports.deleteBrands = async (req, res) => {
    try {
        const data = await EthosBrand.findOne({
            where: {
                id: req.query.id,
            },
        });
        
        if(data.image) {
            fs.unlink(`assets/ethos/${data.image}`,(err) => {
                if (err) throw err;
            });
        }
        
        const result = await EthosBrand.destroy({
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

module.exports.updateBrands = async (req, res) => {
    try {
        const data = await EthosBrand.findOne({where: {
            id: req.body.id,
        }})
        if (req.file) {
            fs.unlink(`assets/ethos/${data.image}`, (err) => {
                  if (err) throw err;
                  console.log('path/file.txt was deleted');
            })
            const tempPath = req.file.path;
            const rename = `${req.file.filename}.${req.file.mimetype.split("/")[1]}`;
            const targetPath = path.join(`assets/ethos/${rename}`);
            fs.rename(tempPath, targetPath, (err) => {
                if (err) return handleError(err, res);
            });
            await EthosBrand.update({
                title: req.body.title,
                description: req.body.description,
                image: rename,
            }, {
                where: {
                    id: req.body.id
                },
            },);
        } else {
            await EthosBrand.update({
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