const EthosSource = require("../../models/ethos/EthosSource.js");
const { Op } = require("sequelize");

module.exports.getSource = async (req, res) => {
    try {
        let result;
        
        if (req.query.keyword) {
            result = await EthosSource.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }
            });
        }else {
            result = await EthosSource.findAll({order: [["id", "DESC"]]});
        }
        
        res.status(200).json({
            status: 200,
            data: result
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports.addSource = async (req, res) => {
    try {
        const result = await EthosSource.create({
            name: req.body.name
        })
        res.status(201).json({
            message: "Success Create"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports.deleteSource = async (req, res) => {
    try {
        const result = await EthosSource.destroy({
            where: {
                id: req.query.id
            }
        })
        res.status(200).json({
            message: "Success deleting"
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

module.exports.updateSource = async (req, res) => {
    try {
        const result = await EthosSource.update({
            name: req.body.name
        }, {
            where: {
                id: req.body.id
            }
        });

        res.json({
            message: "Success Updating"
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}