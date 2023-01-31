const Inbox = require("../models/Inbox.js");
const Employee = require("../models/Employee.js");
const Applicant = require("../models/Applicant.js");
const { Op } = require("sequelize");

// pagination function
const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: requests } = data;
    const currentPage = page ? +parseInt(page) : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, requests, totalPages, currentPage };
};

module.exports.getInbox = async (req, res) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);

        const includes = [
            {
                model: Employee,
                as: "employee",
                attributes: ["id", "firstName", "image"]
            }
        ]
        let data = [];

        if (req.query.status) {
            console.log(req.query.status);
            data = await Inbox.findAndCountAll({
                limit,
                offset,
                where: {
                    isRead: req.query.status == "read" ? true : false,
                    [Op.or]: [
                        {
                            toEmployee: req.userData.employee.id,
                        },
                        {
                            unique_id: req.userData.role_id == 2 || req.userData.role_id == 3 || req.userData == 4 ? {
                                [Op.like]: `${req.userData.unique_id}%`
                            } : req.userData.unique_id
                        }
                    ]
                },
                include: includes,
                raw: true,
                nest: true,
                order: [["id", "DESC"]]
            })
        } else {
            data = await Inbox.findAndCountAll({
                limit,
                offset,
                where: {
                    [Op.or]: [
                        {
                            toEmployee: req.userData.employee.id,
                        },
                        {
                            unique_id: req.userData.role_id == 2 || req.userData.role_id == 3 || req.userData == 4 ? {
                                [Op.like]: `${req.userData.unique_id}%`
                            } : req.userData.unique_id
                        }
                    ]
                },
                include: includes,
                raw: true,
                nest: true,
                order: [["id", "DESC"]]
            })
        }

        let response = getPagingData(data, page, limit);
        return res.jsonData(response)
    } catch (error) {
        return res.serverError("Internal server error: " + error.toString())
    }
}

module.exports.getSingleInbox = async (req, res) => {
    try {
        const includes = [
            {
                model: Employee,
                as: "employee",
                attributes: ["id", "firstName", "image"]
            }
        ]

        const data = await Inbox.findOne({
            where: {
                id: req.params.id
            },
            include: includes,
            raw: true,
            nest: true
        })

        return res.jsonData(data)
    } catch (error) {
        return res.serverError("Internal server error: " + error.toString())
    }
}

// module.exports.pushInbox = async (req, res) => {
//     try {
//         await Inbox.create({
//             toEmployee: req.body.to_employee,
//             employeeId: req.userData.employee.id,
//             title: req.body.title,
//             message: req.body.message,
//             applicant_id: req.body.applicant_id,
//             link: req.body.link,
//             type: req.body.type,
//             otherId: req.body.otherId,
//         })

//         return res.jsonSuccess("Success read status")
//     } catch (error) {
//         return res.serverError("Internal server error: " + error.toString())
//     }
// }

module.exports.pushInbox = async (data) => {
    try {
        return await Inbox.create({
            toEmployee: data.to_employee,
            employeeId: data.employeeId,
            title: data.title,
            message: data.message,
            applicant_id: data.applicant_id,
            link: data.link,
            type: data.type,
            otherId: data.otherId,
            unique_id: data.unique_id
        })
    } catch (error) {
        return res.serverError("Internal server error: " + error.toString())
    }
}

module.exports.readStatus = async (req, res) => {
    try {
        await Inbox.update({
            isRead: true
        }, { where: { id: req.body.id } })

        return res.jsonSuccess("Success read status")
    } catch (error) {
        return res.serverError("Error " + error.toString())
    }
}

module.exports.deleteInbox = async (req, res) => {
    try {
        await Inbox.delete({ where: { id: req.query.id } })

        return res.jsonSuccess("Success delete inbox")
    } catch (error) {
        return res.serverError("Error " + error.toString())
    }
}