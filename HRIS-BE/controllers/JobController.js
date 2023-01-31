const { JobTitle } = require("../models/JobModels");
const { JobGrade } = require("../models/JobModels");
const { JobLevel } = require("../models/JobModels");
const { JobPosition } = require("../models/JobModels");
const Employeestatus = require("../models/Employeestatus.js");
const Employee = require("../models/Employee.js");
const Workshift = require("../models/Workshift.js");
const { Op } = require("sequelize");

module.exports.getJobTitle = async (req, res) => {
  try {
    var result = await JobTitle.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
      order: [["id", "DESC"]],
      include: JobGrade,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.getJobGrade = async (req, res) => {
  try {
    const result = await JobGrade.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
      order: [["id", "DESC"]],
    });
    result.map((job) =>
      job.rangegrade != null || job.rangegrade != ""
        ? (job.rangegrade = JSON.parse(job.rangegrade))
        : null
    );
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
module.exports.getEmployeeStatus = async (req, res) => {
  try {
    const result = await Employeestatus.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
          {
            unique_id: null,
          },
        ],
      },
      order: [["id", "DESC"]],
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.getJobLevel = async (req, res) => {
  try {
    const result = await JobLevel.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
      order: [["id", "DESC"]],
      include: JobGrade,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.getWorkShift = async (req, res) => {
  try {
    const result = await Workshift.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
      order: [["id", "DESC"]],
      include: [
        { model: Employee, attributes: ["id", "firstName"] },
        { model: JobPosition, attributes: ["id", "name"] },
      ],
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.addJobTitle = async (req, res) => {
  try {
    // const tempPath = req.files.specification[0].path;
    // const rename =
    //   req.files.specification[0].filename +
    //   "." +
    //   req.files.specification[0].mimetype.split("/")[1];
    // const targetPath = path.join(`assets/specification/${rename}`);
    // fs.rename(tempPath, targetPath, (err) => {
    //   if (err) return handleError(err, res);
    // });

    const result = await JobTitle.create({
      name: req.body.name,
      grade_id: req.body.grade_id,
      description: req.body.description,
      note: req.body.note,
      unique_id: req.userData.unique_id,
    });

    res.status(201).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.addJobGrade = async (req, res) => {
  try {
    const result = await JobGrade.create({
      name: req.body.name,
      type: req.body.type,
      rangegrade: req.body.range,
      minsalary: req.body.minsalary,
      maxsalary: req.body.maxsalary,
      unique_id: req.userData.unique_id,
    });
    res.send(result);
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
module.exports.addEmployeeStatus = async (req, res) => {
  try {
    const result = await Employeestatus.create({
      name: req.body.name,
      unique_id: req.userData.unique_id,
    });
    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.addJobLevel = async (req, res) => {
  try {
    const result = await JobLevel.create({
      name: req.body.name,
      grade_id: req.body.grade_id,
      unique_id: req.userData.unique_id,
    });
    res.status(201).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.addWorkShift = async (req, res) => {
  try {
    var arr;

    var work = await Workshift.create({
      name: req.body.name,
      start: req.body.start,
      end: req.body.end,
      duration: req.body.duration,
      unique_id: req.userData.unique_id,
    });

    if (req.body.employee_ids.length > 0) {
      arr = req.body.employee_ids;
      await Employee.update({ shift_id: work.id }, { where: { id: arr } });
      // for (var i in arr) {
      //   var updateEmployee = await Employee.update({shift_id: work.id}, {where: {id: i}});
      // }
    } else if (req.body.position_ids.length > 0) {
      arr = req.body.position_ids;
      await JobPosition.update({ shift_id: work.id }, { where: { id: arr } });
      // for (var i in arr) {
      //   var updatePosition = await JobPosition.update({shift_id: work.id}, {where: {id: i}});
      // }
    } else {
      arr = [];
    }

    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.deleteJobTitle = async (req, res) => {
  try {
    const data = await JobTitle.findOne({
      where: {
        id: req.query.id,
      },
    });

    // if (data.specification != null || data.specification != "") {
    //   fs.unlink(`assets/specification/${data.specification}`, (err) => {
    //     if (err) throw err;
    //     console.log("path/file.txt was deleted");
    //   });
    // }

    const result = await JobTitle.destroy({
      where: {
        id: req.query.id,
      },
    });
    res.send({ message: "success" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
module.exports.deleteJobGrade = async (req, res) => {
  try {
    const result = await JobGrade.destroy({ where: { id: req.query.id } });
    res.send({
      message: "success",
    });
  } catch (err) {
    res.send({
      message: "error",
      error: err,
    });
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.deleteEmployeeStatus = async (req, res) => {
  try {
    const result = await Employeestatus.destroy({
      where: { id: req.query.id },
    });
    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.deleteJobLevel = async (req, res) => {
  try {
    const result = await JobLevel.destroy({ where: { id: req.query.id } });
    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.deleteWorkShift = async (req, res) => {
  try {
    const result = await Workshift.destroy({ where: { id: req.query.id } });
    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.updateJobTitle = async (req, res) => {
  try {
    const data = await JobTitle.findOne({
      where: {
        id: req.body.id,
      },
    });

    await JobTitle.update(
      {
        name: req.body.name,
        grade_id: req.body.grade_id,
        description: req.body.description,
        note: req.body.note,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.updateJobGrade = async (req, res) => {
  try {
    const result = await JobGrade.update(
      {
        name: req.body.name,
        type: req.body.type,
        rangegrade: req.body.range,
        minsalary: req.body.minsalary,
        maxsalary: req.body.maxsalary,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
module.exports.updateEmployeeStatus = async (req, res) => {
  try {
    const result = await Employeestatus.update(
      {
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    );
    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.updateJobLevel = async (req, res) => {
  try {
    const result = await JobLevel.update(
      {
        name: req.body.name,
        grade_id: req.body.grade_id,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.updateWorkShift = async (req, res) => {
  try {
    const result = await Workshift.update(
      {
        employee_id: req.body.employee_id,
        name: req.body.name,
        start: req.body.start,
        end: req.body.end,
        duration: req.body.duration,
      },
      { where: { id: req.body.id } }
    );
    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.getJobPosition = async (req, res) => {
  try {
    const result = await JobPosition.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
      order: [["id", "DESC"]],
      include: JobGrade,
    });

    res.status(200).send({
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.addJobPosition = async (req, res) => {
  try {
    const result = await JobPosition.create({
      name: req.body.name,
      grade_id: req.body.grade_id,
      job_id: req.body.job_id,
      relation_code:
        req.body.relation_code == "Select" ? null : req.body.relation_code,
      color: req.body.color,
      unique_id: req.userData.unique_id,
    });

    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.deleteJobPosition = async (req, res) => {
  try {
    const result = await JobPosition.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateJobPosition = async (req, res) => {
  try {
    await JobPosition.update(
      {
        name: req.body.name,
        grade_id: req.body.grade_id,
        job_id: req.body.job_id,
        relation_code:
          req.body.relation_code == "Select" ? null : req.body.relation_code,
        color: req.body.color,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.status(200).send({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.getJobPositionByIdWithEmployee = async (req, res) => {
  try {
    const result = await JobPosition.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
      },
    });

    res.status(200).send({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
// INI GK DIPAKE!
module.exports.bulkUploadJob = (req, res) => {
  try {
    if (req.body.jobgrade.length > 0) {
      req.body.jobgrade.map(async (grade) => {
        await JobGrade.create({
          name: grade["Job Grade"],
          type: grade["Currency"],
          minsalary: grade["Min Salary"],
          maxsalary: grade["Max Salary"],
        });
      });
    }

    if (req.body.joblevel.length > 0) {
      req.body.joblevel.map(async (level) => {
        const find = await JobGrade.findOne({
          where: {
            name: level["Job Grade"],
          },
          attributes: ["id", "name"],
        });

        await JobLevel.create({
          name: level["Level Name"],
          grade_id: find.id,
        });
      });
    }

    if (req.body.jobtitle.length > 0) {
      req.body.jobtitle.map(async (title) => {
        const find = await JobGrade.findOne({
          where: {
            name: title["Job Grade"],
          },
          attributes: ["id", "name"],
        });

        await JobTitle.create({
          name: title["Title Name"],
          grade_id: find.id,
        });
      });
    }

    if (req.body.jobposition.length > 0) {
      req.body.jobposition.map(async (position) => {
        const find = await JobGrade.findOne({
          where: {
            name: position["Job Grade"],
          },
          attributes: ["id", "name"],
        });

        const findPosi = await JobPosition.findOne({
          where: {
            job_id: position["Relation Code"],
          },
        });

        await JobPosition.create({
          name: position["Position Name"],
          grade_id: find.id,
          job_id: position["Job Id"],
          relation_code: position["Job Id"] == "C01" ? null : findPosi.id,
        });
      });
    }

    res.status(200).json({
      status: 200,
      message: "Success bulk import!",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.bulkUploadJobGrade = async (req, res) => {
  try {
    await req.body.map(async (grade) => {
      await JobGrade.create({
        name: grade["Job Grade"],
        type: grade["Currency"],
        minsalary: grade["Min Salary"],
        maxsalary: grade["Max Salary"],
        unique_id: req.userData.unique_id,
      });
    });

    res.status(200).json({
      status: 200,
      message: "Success bulk import!",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.bulkUploadJobLevel = async (req, res) => {
  try {
    await req.body.map(async (level) => {
      const find = await JobGrade.findOne({
        where: {
          name: level["Job Grade"],
        },
        attributes: ["id", "name"],
      });
      await JobLevel.create({
        name: level["Level Name"],
        grade_id: find.id,
        unique_id: req.userData.unique_id,
      });
    });

    res.status(200).json({
      status: 200,
      message: "Success bulk import!",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.bulkUploadJobTitle = async (req, res) => {
  try {
    await req.body.map(async (title) => {
      const find = await JobGrade.findOne({
        where: {
          name: title["Job Grade"],
        },
        attributes: ["id", "name"],
      });

      await JobTitle.create({
        name: title["Title Name"],
        grade_id: find.id,
        unique_id: req.userData.unique_id,
      });
    });

    res.status(200).json({
      status: 200,
      message: "Success bulk import!",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.bulkUploadJobPosition = async (req, res) => {
  try {
    const data = req.body.data;

    for (var i = 0; i < data.length; i++) {
      var position = data[i];
      console.log(position);
      const jobGrade = await JobGrade.findOne({
        where: {
          name: position["Job Grade"],
        },
      });

      if (
        position["Relation Code"] == "none" ||
        position["Relation Code"] == undefined
      ) {
        await JobPosition.create({
          unique_id: req.userData.unique_id,
          name: position["Position Name"],
          grade_id: jobGrade ? jobGrade.id : null,
          job_id: position["Job Id"],
        });
      } else {
        const jobPos = await JobPosition.findOne({
          where: {
            job_id: position["Relation Code"],
          },
        });
        console.log("JOB POSITION 11: ", jobPos);
        await JobPosition.create({
          unique_id: req.userData.unique_id,
          name: position["Position Name"],
          grade_id: jobGrade ? jobGrade.id : null,
          job_id: position["Job Id"],
          relation_code: jobPos ? jobPos.id : null,
        });
      }
    }

    for (var i = 0; i < data.length; i++) {
      var position = data[i];
      if (
        position["Relation Code"] != "none" ||
        position["Relation Code"] != undefined
      ) {
        const parent = await JobPosition.findOne({
          where: {
            job_id: position["Relation Code"],
          },
        });
        const child = await JobPosition.findOne({
          where: {
            job_id: position["Job Id"],
          },
        });
        console.log("JOB POSITION 33: ", child);
        await JobPosition.update(
          {
            relation_code: parent ? parent.id : null,
          },
          {
            where: {
              id: child ? child.id : null,
            },
          }
        );
      }
    }

    res.status(200).json({
      status: 200,
      message: "Success bulk import!",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
