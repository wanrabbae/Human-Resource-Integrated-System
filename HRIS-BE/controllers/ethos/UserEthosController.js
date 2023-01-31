const EthosUser = require("../../models/ethos/EthosUser.js");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports.login = async (req, res) => {
    try {
        const user = await EthosUser.findOne({ where: { username: req.body.username } });
        if (user == null)
            res.send({
                status: 404,
                message: "Wrong username or Password",
            })
        const hash = req.body.password;
        const check = await bcrypt.compare(hash, user.password).then(function (result) { return result });
        if (check == false) {
            res.send({
                status: 404,
                message: "Wrong username or Password",
            })
        }
        
        const token = jwt.sign({userId: user.id}, "Bk920^yieJfoNLg0j");
        
        res.send({
            status: 200,
            message: "Success",
            token: token,
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                status: user.status,
                email: user.email
            },
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.getUsers = async (req, res) => {
    try{
        var users;
        if (req.query.keyword != "" && req.query.keyword) {
            users = await EthosUser.findAll({
                order: [["id", "DESC"]], 
                attributes: {exclude: ["password"]},
                where: {
                    [Op.or]: [
                        {
                            username: {
                                [Op.like]: `%${req.query.keyword}%`,
                            },
                        },
                        {
                            employeeName: {
                                [Op.like]: `%${req.query.keyword}%`,
                            },
                        },
                        {
                            role: {
                                [Op.like]: `%${req.query.keyword}%`,
                            },
                        },
                        {
                            email: {
                                [Op.like]: `%${req.query.keyword}%`,    
                            },
                        },
                    ],
                }
            });
        } else {
            users = await EthosUser.findAll({
                order: [["id", "DESC"]], 
                attributes: {exclude: ["password"]}
            });
        }
        
        return res.status(200).json({
            status: 200,
            data: users
        })
        
    }catch(err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        })
    }
}

module.exports.addUsers = async (req, res) => {
    try {
        if (req.body.password !== req.body.password_confirmed) {
            return res.status(400).json({
                status: 400,
                message: "Invalid password confirmation"
            })
        }
        
        const checkEmail = await EthosUser.findOne({
            where: {email: req.body.email},
            attributes: ["id", "email"]
        })
        
        if (checkEmail) {
            return res.status(400).json({
                status: 400,
                message: "Email already used"
            })
        }
        
        const checkUsername = await EthosUser.findOne({
            where: {username: req.body.username},
            attributes: ["id", "username"]
        })
        
        if (checkUsername) {
            return res.status(400).json({
                status: 400,
                message: "Username already used"
            })
        }
        
        const password = await bcrypt.hash(req.body.password, 12).then(hash => { return hash; });
        
        const save = await EthosUser.create({
            username: req.body.username,
            employeeName: req.body.employeeName,
            role: req.body.role,
            status: req.body.status,
            email: req.body.email,
            password: password,
        });
        
        return res.status(201).json({
            status: 201,
            message: "Success create user"
        })
        
    }catch(err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        })
    }
}

module.exports.deleteUsers = async (req, res) => {
    try{
        
        const users = await EthosUser.findOne({
            attributes: ["id"],
            where: {
                id: req.query.id,
            }
        });
        
        if(!users) {
            return res.status(404).json({
            status: 404,
            message: "User not found",
        })
        }
        
        const deleteUser = await EthosUser.destroy({
            where: {
                id: req.query.id
            }
        })
        
        return res.status(200).json({
            status: 200,
            message: "Success delete user"
        })
        
    }catch(err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        })
    }
}

module.exports.updateUsers = async (req, res) => {
    try {
        const user = await EthosUser.findOne({
            attributes: ["id", "password"],
            where: {
                id: req.body.id
            },
        });
        
        let newPw = user.password;
        
        if (req.body.password) {
            newPw = await bcrypt.hash(req.body.password, 12).then(hash => { return hash; });
        }
        
        const save = await EthosUser.update({
            username: req.body.username,
            employeeName: req.body.employeeName,
            role: req.body.role,
            status: req.body.status,
            email: req.body.email,
            password: newPw,
        }, {
            where: {
                id: req.body.id,
            }
        });
        
        return res.status(200).json({
            status: 200,
            message: "Success update user"
        })
        
    }catch(err) {
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        })
    }
}