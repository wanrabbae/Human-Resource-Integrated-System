const Employee = require("../models/Employee.js");
const User = require("../models/User.js");
const { JobTitle } = require("../models/JobModels.js");
const EmployeeRecord = require("../models/EmployeeRecord.js");
const Op = require("sequelize").Op;
const Leave = require("../models/Leave.js")
const Respondent = require("../models/Respondent.js")
const path = require("path");
const fs = require("fs");

// SEMUA YG ADA KATA 'USER' BERARTI API BUAT MOBILE APP

// pagination function
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

module.exports.getUserRecord = async (req, res) => {
  try {
    let result;

    result = await EmployeeRecord.findOne({
      where: {
        employeeId: req.userData.employee.id,
        date: {
          [Op.gte]: `${new Date().toISOString().split("T")[0]}`,
        }
        // date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName", "lastName"],
      },
      // raw: true,
      // nest: true,
    });

    if (result) {
      if (result.imageIn && result.imageIn != null) {
        result.imageIn = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageIn}`
      }

      if (result.imageOut && result.imageOut != null) {
        result.imageOut = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageOut}`
      }
    }

    let hari = new Date(result.date).getDay();
    let namaHari;

    switch (hari) {
      case 0:
        namaHari = "Sunday";
        break;
      case 1:
        namaHari = "Monday";
        break;
      case 2:
        namaHari = "Tuesday";
        break;
      case 3:
        namaHari = "Wednesday";
        break;
      case 4:
        namaHari = "Thursday";
        break;
      case 5:
        namaHari = "Friday";
        break;
      case 6:
        namaHari = "Saturday";
        break;
    }

    result.setDataValue("day", namaHari);

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err.toString(),
    });
  }
};

module.exports.getDateWeek = async (req, res) => {
  try {
    let result;

    result = await EmployeeRecord.findAll({
      where: {
        employeeId: req.userData.employeeId,
        date: {
          [Op.lte]: `${new Date().toISOString().split("T")[0]}`,
        }
        // date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1)}-${new Date().getDate()}`,
      },
      attributes: ["date", "checkIn", "checkOut", "noteCheckIn", "noteCheckOut"],
      order: [["id", "DESC"]],
      limit: 6,
      include: {
        model: Employee,
        attributes: ["id", "firstName", "lastName"],
        
      },
      // raw: true,
      // nest: true,
    });

    // if (result) {
    //   if (result.imageIn && result.imageIn != null) {
    //     result.imageIn = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageIn}`
    //   }

    //   if (result.imageOut && result.imageOut != null) {
    //     result.imageOut = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageOut}`
    //   }
    // }

    let hari = new Date(result.date).getDay();
    let namaHari;

    switch (hari) {
      case 0:
        namaHari = "Sunday";
        break;
      case 1:
        namaHari = "Monday";
        break;
      case 2:
        namaHari = "Tuesday";
        break;
      case 3:
        namaHari = "Wednesday";
        break;
      case 4:
        namaHari = "Thursday";
        break;
      case 5:
        namaHari = "Friday";
        break;
      case 6:
        namaHari = "Saturday";
        break;
    }

    // result.setDataValue("day", namaHari);

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err.toString(),
    });
  }
};

// mobile get date for 1 week

// module.exports.getDateWeek = async (req, res) => {
//   try {
//     let result;

//     result = await EmployeeRecord.findAll({
//       where: {
//         employeeId: req.userData.employeeId,
//       },
//       // order: [["id", "DESC"]],
//       attributes: ["date", "checkIn", "checkOut", "noteCheckIn", "noteCheckOut"],
//       include: {
//         model: Employee,
//         attributes: ["id", "firstName", "lastName"],
//       },
//       raw: true,
//       nest: true,
//     });

//     // if (result) {
//     //   result.map(result => {
//     //     if (result.imageIn && result.imageIn != null) {
//     //       result.imageIn = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageIn}`
//     //     }

//     //     if (result.imageOut && result.imageOut != null) {
//     //       result.imageOut = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageOut}`
//     //     }
//     //   })
//     // }

//     res.status(200).json({
//       status: 200,
//       result: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       message: "Internal server eror",
//       error: err,
//     });
//   }
// };


module.exports.getUserAttendances = async (req, res) => {
  try {
    let result;

    result = await EmployeeRecord.findAll({
      where: {
        employeeId: req.userData.employee.id,
      },
      order: [["id", "DESC"]],
      include: {
        model: Employee,
        attributes: ["id", "firstName", "lastName"],
      },
      raw: true,
      nest: true,
    });

    if (result) {
      result.map(result => {
        if (result.imageIn && result.imageIn != null) {
          result.imageIn = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageIn}`
        }

        if (result.imageOut && result.imageOut != null) {
          result.imageOut = `${req.protocol}://${req.get('host')}/assets/employee/${result.imageOut}`
        }
      })
    }

    res.status(200).json({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.postUserRecord = async (req, res) => {
  try {
    let result;
    let image = null;

    if (req.file) {
      const tempPath = req.file.path;
      image =
        req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/employee/${image}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const find = await EmployeeRecord.findOne({
      order: [["id", "DESC"]],
      where: {
        employeeId: req.userData.employee.id,
      },
      raw: true,
      nest: true,
    });

    if (find) {
      if (
        new Date(find.date).toDateString() == new Date().toDateString() &&
        find.isChecked == 0
      ) {
        // check out
        result = await EmployeeRecord.update(
          {
            checkOut: req.body.checkIn,
            noteCheckOut: req.body.noteCheckIn,
            isChecked: 1,
            imageOut: image,
          },
          { where: { id: find.id } }
        );

        const find2 = await EmployeeRecord.findOne({
          order: [["id", "DESC"]],
          where: {
            employeeId: req.userData.employee.id,
          },
          raw: true,
          nest: true,
        });

        let checkIn = find2.checkIn;
        let checkOut = find2.checkOut;

        let duration = parseInt(checkOut.split(":")[0]) - parseInt(checkIn.split(":")[0]);
        let duration2 = parseInt(checkOut.split(":")[1]) + parseInt(checkIn.split(":")[1]);
        let duration3 = parseInt(checkOut.split(":")[1]) - parseInt(checkIn.split(":")[1]);

        if (duration2 >= 60) {
          duration += 1
          duration2 %= duration2;
        }

        await EmployeeRecord.update(
          {
            duration: `${duration}:${Math.abs(duration3)}`
          },
          { where: { id: find2.id } }
        );
      }
      //   else if(new Date(find.date).toDateString() != new Date().toDateString() && find.isChecked == 1) {

      //     // send warning
      //     return res.status(400).json({
      //         status: 400,
      //         message: "You already checked in!"
      //     });
      //   }
      else {
        // check in
        result = await EmployeeRecord.create({
          employeeId: req.userData.employee.id,
          checkIn: req.body.checkIn,
          noteCheckIn: req.body.noteCheckIn,
          isChecked: 0,
          unique_id: req.userData.unique_id,
          imageIn: image,
        });
      }

    } else {
      // check in
      result = await EmployeeRecord.create({
        employeeId: req.userData.employee.id,
        checkIn: req.body.checkIn,
        noteCheckIn: req.body.noteCheckIn,
        isChecked: 0,
        unique_id: req.userData.unique_id,
        imageIn: image,
      });
    }

    res.json({
      message: "Success Check In / Out",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.getEmployeeRecord = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    // let result;

    if (req.query.keyword) {
      await EmployeeRecord.findAndCountAll({
        where: {
          unique_id: req.userData.unique_id,
        },
        include: {
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
          include: {
            model: JobTitle,
          },

        },
        // limit,
        // offset,
      })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            message: "Something went wrong!",
          });
        });
    } else if (req.query.date) {
      await EmployeeRecord.findAndCountAll({
        where: {
          unique_id: req.userData.unique_id,
          date: req.query.date,
        },
        include: {
          model: Employee,
          attributes: ["id", "firstName", "lastName"],
          include: {
            model: JobTitle,
          },
        },
        //   limit,
        //   offset,
      })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            message: "Something went wrong!",
          });
        });
    } else {
      await EmployeeRecord.findAndCountAll({
        where: {
          unique_id: req.userData.unique_id,
        },
        order: [["id", "DESC"]],
        include: {
          model: Employee,
          attributes: ["id", "firstName", "lastName"],
          include: {
            model: JobTitle,
          },
        },
        limit,
        offset,
      })
        .then((data) => {
          const response = getPagingData(data, page, limit);
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            message: "Something went wrong!",
            err: err.toString(),
          });
        });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.addEmployeeRecord = async (req, res) => {
  try {
    let result;
    const find = await EmployeeRecord.findOne({
      order: [["id", "DESC"]],
      where: {
        employeeId: req.body.employeeId,
      },
      raw: true,
      nest: true,
    });

    if (find) {
      if (
        new Date(find.date).toDateString() == new Date().toDateString() &&
        find.isChecked == 0
      ) {
        // check out
        result = await EmployeeRecord.update(
          {
            checkOut: req.body.checkIn,
            noteCheckOut: req.body.noteCheckIn,
            isChecked: 1,
          },
          { where: { id: find.id } }
        );

        const find2 = await EmployeeRecord.findOne({
          order: [["id", "DESC"]],
          where: {
            employeeId: req.body.employeeId,
          },
          raw: true,
          nest: true,
        });

        let checkIn = find2.checkIn;
        let checkOut = find2.checkOut;

        let duration = parseInt(checkOut.split(":")[0]) - parseInt(checkIn.split(":")[0]);
        let duration2 = parseInt(checkOut.split(":")[1]) + parseInt(checkIn.split(":")[1]);
        let duration3 = parseInt(checkOut.split(":")[1]) - parseInt(checkIn.split(":")[1]);

        if (duration2 >= 60) {
          duration += 1
          duration2 %= duration2;
        }

        await EmployeeRecord.update(
          {
            duration: `${duration}:${Math.abs(duration3)}`
          },
          { where: { id: find2.id } }
        );
      }
      //   else if(new Date(find.date).toDateString() != new Date().toDateString() && find.isChecked == 1) {

      //     // send warning
      //     return res.status(400).json({
      //         status: 400,
      //         message: "You already checked in!"
      //     });
      //   }
      else {
        // check in
        result = await EmployeeRecord.create({
          employeeId: req.body.employeeId,
          checkIn: req.body.checkIn,
          noteCheckIn: req.body.noteCheckIn,
          isChecked: 0,
          unique_id: req.userData.unique_id,
        });
      }
    } else {
      // check in
      result = await EmployeeRecord.create({
        employeeId: req.body.employeeId,
        checkIn: req.body.checkIn,
        noteCheckIn: req.body.noteCheckIn,
        isChecked: 0,
        unique_id: req.userData.unique_id,
      });
    }

    res.json({
      message: "Success Check In / Out",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.deleteEmployeeRecord = async (req, res) => {
  try {
    const result = await EmployeeRecord.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.json(
      result
        ? {
          message: "Success deleting",
        }
        : {
          message: "Error Deleting",
        }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};

module.exports.updateEmployeeRecord = async (req, res) => {
  try {
    const result = await EmployeeRecord.update(
      {
        employeeId: req.body.employeeId,
        date: req.body.date,
        checkIn: req.body.checkIn,
        noteCheckIn: req.body.noteCheckIn,
        checkOut: req.body.checkOut,
        noteCheckOut: req.body.noteCheckOut,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.json(
      result
        ? {
          message: "Success Updating",
        }
        : {
          message: "Error Updating",
        }
    );
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server eror",
      error: err,
    });
  }
};