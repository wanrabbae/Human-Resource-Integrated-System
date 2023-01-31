const path = require("path");
const fs = require("fs");
const Schedule = require("../models/Schedule.js");
const Attendance = require("../models/Attendance.js");
const Employee = require("../models/Employee.js");
const { JobTitle } = require("../models/JobModels.js");
const { Op } = require("sequelize");

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? +(page - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: requests } = data;
  const currentPage = page ? +parseInt(page) : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, requests, totalPages, currentPage };
};


module.exports.getSchedule = async (req, res) => {
  try {
    let schedule = [];
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    if (req.query.keyword) {
      schedule = await Schedule.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Employee,
            attributes: ["id", "firstName", "lastName"],
            where: {
              [Op.or]: [
                {
                  firstName: {
                    [Op.like]: `%${req.query.keyword}%`,
                  },
                },
                {
                  lastName: {
                    [Op.like]: `%${req.query.keyword}%`,
                  },
                },
              ],
            },
          },
        ],
      });
    } else if (req.query.date) {
      schedule = await Schedule.findAndCountAll({
        limit,
        offset,
        where: {
          unique_id: req.userData.unique_id,
          created_at: {
            [Op.lt]: new Date(req.query.date),
            [Op.gt]: new Date(req.query.date)
          },
        },
        include: [
          {
            model: Employee,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });
    } else {
      if (req.userData.role_id == 2 || req.userData.role_id == 3 || req.userData.role_id == 4) { //admin / subadmin / subsdiary
        schedule = await Schedule.findAndCountAll({
          order: [["id", "DESC"]],
          limit,
          offset,
          where: {
            [Op.or]: [
              {
                unique_id: req.userData.unique_id,
              },
            ],
          },
          include: [
            {
              model: Employee,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        });
      } else {
        schedule = await Schedule.findAndCountAll({
          limit,
          offset,
          order: [["id", "DESC"]],
          where: {
            employeeId: req.userData.employee.id,
          },
          include: [
            {
              model: Employee,
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        });
      }
    }

    if (schedule) {
      schedule.rows.map(sch => {
        if (sch.schedule_type == "by_days") {
          sch.days = JSON.parse(sch.days)
        } else {
          sch.dates = JSON.parse(sch.dates)
        }
      })
    }

    let response = getPagingData(schedule, page, limit)

    res.status(200).json({
      status: 200,
      result: response,
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e.toString(),
    });
  }
};

module.exports.getSingleSchedule = async (req, res) => {
  try {
    const data = await Schedule.findByPk(req.params.id, {
      include: {
        model: Employee,
        attributes: ["id", "firstName"]
      }
    })

    if (data) {
      if (data.schedule_type == "by_days") {
        data.days = JSON.parse(data.days)
      } else {
        data.dates = JSON.parse(data.dates)
      }
    }
    return res.jsonData(data)
  } catch (error) {
    return res.serverError("Error: " + error.toString())
  }
}

module.exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.update({
      employeeId: req.body.employeeId,
      schedule_type: req.body.schedule_type,
      schedule: req.body.schedule,
      dates: req.body.dates,
      days: req.body.days,
    }, { where: { id: req.params.id } });

    res.send({
      message: "success",
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e,
    });
  }
};

module.exports.addSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create({
      employeeId: req.body.employeeId,
      schedule_type: req.body.schedule_type,
      schedule: req.body.schedule,
      dates: req.body.dates,
      days: req.body.days,
      unique_id: req.userData.unique_id,
    });

    res.send({
      message: "success",
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e,
    });
  }
};

module.exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.destroy({
      where: { id: req.params.id }
    });

    res.send({
      message: "success delete",
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e,
    });
  }
};

// My Attendance (GK DIPAKE)

module.exports.getAttendance = async (req, res) => {
  try {
    let result;

    // if (req.query.keyword) {
    //   result = await Attendance.findAll({});
    // } else if (req.query.date) {
    //   result = await Attendance.findAll({
    //     where: {
    //       date: req.query.date,
    //     },
    //   });
    // } else {
    //   result = await Attendance.findAll({
    //     order: [["id", "DESC"]]
    //   });
    // }

    res.status(200).json({ message: "THIS API GK DIPAKE, JIKA INGIN ABSENSI GUNAKAN API DARI MOBILE" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.addAttendance = async (req, res) => {
  try {
    let result;
    // const find = await Attendance.findOne({
    //   order: [["date", "DESC"]],
    //   raw: true,
    //   nest: true,
    // });

    // if (find) {
    //   if (
    //     new Date(find.date).toDateString() == new Date().toDateString() &&
    //     find.isChecked == 0
    //   ) {
    //     // check out
    //     result = await Attendance.update(
    //       {
    //         checkOut: req.body.checkIn,
    //         noteCheckOut: req.body.noteCheckIn,
    //         isChecked: 1,
    //       },
    //       { where: { id: find.id } }
    //     );
    //     const find2 = await Attendance.findOne({
    //       where: {
    //         id: find.id,
    //       },
    //       raw: true,
    //       nest: true,
    //     });

    //     let checkIn = find2.checkIn;
    //     let checkOut = find2.checkOut;

    //     let duration = parseInt(checkOut.split(":")[0]) - parseInt(checkIn.split(":")[0]);
    //     let duration2 = parseInt(checkOut.split(":")[1]) + parseInt(checkIn.split(":")[1]);

    //     if (duration2 >= 60) {
    //       duration += 1
    //       duration2 %= duration2;
    //     }

    //     await Attendance.update(
    //       {
    //         duration: `${duration}:${duration2}`
    //       },
    //       { where: { id: find2.id } }
    //     );
    //   } else {
    //     // send warning
    //     // return res.status(400).json({
    //     //     status: 400,
    //     //     message: "You already checked in!"
    //     // });
    //     // check in
    //     result = await Attendance.create({
    //       employeeId: req.body.employeeId,
    //       checkIn: req.body.checkIn,
    //       noteCheckIn: req.body.noteCheckIn,
    //       isChecked: 0,
    //     });
    //   }
    // } else {
    //   // check in
    //   result = await Attendance.create({
    //     employeeId: req.body.employeeId,
    //     checkIn: req.body.checkIn,
    //     noteCheckIn: req.body.noteCheckIn,
    //     isChecked: 0,
    //   });
    // }

    res.status(200).json({ message: "THIS API GK DIPAKE, JIKA INGIN ABSENSI GUNAKAN API DARI MOBILE" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};
