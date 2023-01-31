const EthosWorkType = require("../../models/ethos/EthosWorkType.js");
const { Op } = require("sequelize");

module.exports.getWorkType = async (req, res) => {
    try {
        let result;
        
        if (req.query.keyword) {
            result = await EthosWorkType.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.keyword}%`
                    }
                }
            });
        }else {
            result = await EthosWorkType.findAll({order: [["id", "DESC"]]});
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

module.exports.addWorkType = async (req, res) => {
    try {
        const result = await EthosWorkType.create({
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

module.exports.deleteWorkType = async (req, res) => {
    try {
        const result = await EthosWorkType.destroy({
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

module.exports.updateWorkType = async (req, res) => {
    try {
        const result = await EthosWorkType.update({
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