const Event = require("../models/Event.js");
const { Op } = require("sequelize");

module.exports.getEvent = async (req, res) => {
  try {
    const result = await Event.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
    });
    let date1;
    let date2;

    result.map((res) => {
      if (res.startDate != null || res.endDate != null) {
        res.start = `${res.startDate.split("-")[1]}-${res.startDate.split("-")[2]
          }-${res.startDate.split("-")[0]} ${res.start}`;
        res.end = `${res.endDate.split("-")[1]}-${res.endDate.split("-")[2]}-${res.endDate.split("-")[0]
          } ${res.end}`;
      }
    });

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.addEvent = async (req, res) => {
  try {
    let result;

    if (req.body.category == "event") {
      result = await Event.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        start: req.body.start,
        end: req.body.end,
        location: req.body.location,
        calendar: req.body.calendar,
        category: req.body.category,
        unique_id: req.userData.unique_id,
        // employeeId: req.userData.employee.id,
      });
    } else {
      result = await Event.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        start: req.body.start,
        end: req.body.end,
        calendar: req.body.calendar,
        details: req.body.details,
        employeeId: req.userData.employee.id,
        category: req.body.category,
        unique_id: req.userData.unique_id,
      });
    }

    res.status(201).json(
      result
        ? {
          status: 201,
          message: "Success Create",
        }
        : {
          message: "Error Create",
        }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.deleteEvent = async (req, res) => {
  try {
    const result = await Event.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.status(200).json(
      result
        ? {
          status: 200,
          message: "Success deleting",
        }
        : {
          message: "Error Deleting",
        }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateEvent = async (req, res) => {
  try {
    let result;

    if (req.body.category == "event") {
      result = await Event.update(
        {
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          start: req.body.start,
          end: req.body.end,
          location: req.body.location,
          calendar: req.body.calendar,
        },
        { where: { id: req.body.id } }
      );
    } else {
      result = await Event.update(
        {
          title: req.body.title,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          start: req.body.start,
          end: req.body.end,
          calendar: req.body.calendar,
          details: req.body.details,
        },
        { where: { id: req.body.id } }
      );
    }

    res.status(200).json(
      result
        ? {
          status: 200,
          message: "Success Updating",
        }
        : {
          message: "Error Updating",
        }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
