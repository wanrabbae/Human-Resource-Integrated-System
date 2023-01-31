const Forums = require("../models/Forums.js");
const Employee = require("../models/Employee.js");
const { JobTitle } = require("../models/JobModels.js");
const { pushInbox } = require("./InboxController.js");

module.exports.createPost = async (req, res) => {
  try {
    await Forums.create({
      employeeId: req.body.employeeId,
      description: req.body.description,
      unique_id: req.userData.unique_id,
    });

    await pushInbox({
      employeeId: req.userData.employee.id,
      title: `Forums - ${req.body.description.slice(0, 10)}`,
      message: `${req.body.description}`,
      unique_id: req.userData.unique_id
    })

    res.status(201).json({
      success: 201,
      message: "success create new forum post",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};

module.exports.getPost = async (req, res) => {
  try {
    const data = await Forums.findAll({
      limit: req.query.limit ? parseInt(req.query.limit) : null,
      where: {
        unique_id: req.userData.unique_id
      },
      order: [["id", "DESC"]],
      include: {
        model: Employee,
        as: "employee",
        attributes: ["id", "firstName", "image"],
        include: {
          model: JobTitle,
          attributes: ["id", "name"]
        }
      }
    });

    res.jsonData(data)
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      err: err.toString(),
    });
  }
};