const Employee = require("../models/Employee.js");
const ReportMethod = require("../models/ReportMethod.js");
const Report = require("../models/Report.js");
const TerminationReason = require("../models/TerminationReason.js");
const EmployeePayroll = require("../models/EmployeePayroll.js");
const EmployeeStatus = require("../models/Employeestatus.js");
const Workshift = require("../models/Workshift.js");
const Nationality = require("../models/Nationality.js");
const {
  JobTitle,
  JobGrade,
  JobLevel,
  JobPosition,
} = require("../models/JobModels.js");
const User = require("../models/User.js");
const Emergencycontact = require("../models/Emergencycontact.js");
const Dependent = require("../models/Dependent.js");
const Organization = require("../models/Organization.js");
const Immigration = require("../models/Immigration.js");
const Applicant = require("../models/Applicant.js");
const ReportTo = require("../models/ReportTo.js");
const EmployeeTermination = require("../models/EmployeeTermination.js");
const PayrollComponent = require("../models/PayrollComponent.js");
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const e = require("express");
const xlsx = require("node-xlsx");
const XLSX = require("xlsx");

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

module.exports.addEmployee = async (req, res) => {
  try {
    let gambar = "";
    let result;

    if (req.file) {
      const tempPath = req.file.path;
      gambar = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/employee/${gambar}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.body.createUser != null) {
      result = await Employee.create({
        image: gambar,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherId: req.body.employeeId,
        joinDate: req.body.joinedDate,
        jobtitle_id: req.body.jobtitle_id,
        employeestatus_id: req.body.employeestatus_id,
        jobgrade_id: req.body.jobgrade_id,
        joblevel_id: req.body.joblevel_id,
        jobposition_id: req.body.jobposition_id,
        location: req.body.location,
        unique_id: req.userData.unique_id,
      });

      const checkUser = await User.findOne({
        where: {
          username: req.body.username,
        },
        attributes: ["id", "username"],
      });

      if (checkUser) {
        await Employee.destroy({ where: { id: result.id } });
        return res.status(400).json({
          status: 400,
          message: "Username already exist!",
        });
      }

      if (req.body.password.length < 8) {
        await Employee.destroy({ where: { id: result.id } });
        return res.status(400).json({
          status: 400,
          message: "Password must more than 8 character",
        });
      }

      const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
        return hash;
      });
      await User.create({
        name: req.body.firstName,
        username: req.body.username,
        employeeId: result.id,
        password: password,
        status: req.body.status,
        location: req.body.location,
        role: "user",
        unique_id: req.userData.unique_id,
      });
    } else {
      result = await Employee.create({
        image: gambar,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherId: req.body.employeeId,
        joinDate: req.body.joinedDate,
        jobtitle_id: req.body.jobtitle_id,
        employeestatus_id: req.body.employeestatus_id,
        jobgrade_id: req.body.jobgrade_id,
        joblevel_id: req.body.joblevel_id,
        jobposition_id: req.body.jobposition_id,
        location: req.body.location,
        unique_id: req.userData.unique_id,
      });
    }

    // create report to with relation code
    const findPosi = await JobPosition.findOne({
      where: {
        id: req.body.jobposition_id,
      },
      attributes: ["id", "relation_code"],
    });
    // cari atasan
    const findRelation = await JobPosition.findOne({
      where: {
        id: findPosi.relation_code,
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
      },
    });
    // cari bawahan
    const findBawahan = await JobPosition.findOne({
      where: {
        relation_code: req.body.jobposition_id,
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
      },
    });

    if (findRelation.employees) {
      if (findRelation.employees.length > 0) {
        findRelation.employees.map(async (emp) => {
          await ReportTo.create({
            name: emp.firstName,
            status: "supervisor",
            reporting_method_id: 1, // direct = 1, indirect = 2
            structureId: "",
            employeeId: result.id,
            reportToEmployee: emp.id,
          });

          // menambah data subordinate pada si atasan employee
          await ReportTo.create({
            name: req.body.firstName,
            status: "subordinate",
            reporting_method_id: 1,
            structureId: "",
            employeeId: emp.id,
            reportToEmployee: result.id,
          });
        });
      }
    }

    if (findBawahan.employees) {
      if (findBawahan.employees.length > 0) {
        findBawahan.employees.map(async (emp) => {
          await ReportTo.create({
            name: emp.firstName,
            status: "subordinate",
            reporting_method_id: 1, // direct = 1, indirect = 2
            structureId: "",
            employeeId: result.id,
            reportToEmployee: emp.id,
          });
          await ReportTo.create({
            name: req.body.firstName,
            status: "supervisor",
            reporting_method_id: 1, // direct = 1, indirect = 2
            structureId: "",
            employeeId: emp.id,
            reportToEmployee: result.id,
          });
        });
      }
    }

    res.send({
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Error" + err.toString(),
      error: err,
    });
  }
};
module.exports.getEmployee = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  try {
    let result;

    if (req.query.keyword) {
      await Employee.findAndCountAll({
        where: {
          unique_id: req.userData.unique_id,
          firstName: {
            [Op.like]: `%${req.query.keyword}%`,
          },
        },
        include: [
          { model: JobTitle, attributes: ["id", "name"] },
          { model: EmployeeStatus },
          { model: JobGrade, attributes: ["id", "name"] },
          { model: JobLevel, attributes: ["id", "name"] },
          { model: JobPosition },
        ],
        raw: true,
        nest: true,
      })
        .then(async (data) => {
          const response = getPagingData(data, page, limit);

          for (let i = 0; i < response.requests.length; i++) {
            const element = response.requests[i];
            const findSpv = await JobPosition.findOne({
              where: { id: element.jobposition.relation_code },
              include: { model: Employee, attributes: ["id", "firstName"] },
              raw: true,
              nest: true,
            });
            if (findSpv) {
              if (element.jobposition.relation_code != null) {
                if (element.jobposition.relation_code == findSpv.id) {
                  element.otherId = findSpv.employees.firstName;
                  element.relation_code_id = `${findSpv.job_id}`;
                }
              }
            } else {
              element.otherId = "";
              element.relation_code_id = "";
            }
          }

          res.status(200).json({
            status: 200,
            result: response,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            message: "Something went wrong! " + err.toString(),
          });
        });
    } else if (req.query.id) {
      result = await Employee.findOne({
        where: {
          id: req.query.id,
        },
        include: [
          { model: JobTitle },
          { model: JobPosition },
          { model: Nationality },
          { model: EmployeeStatus },
          { model: Workshift },
        ],
      });
      result.image =
        result.image != null || result.image != ""
          ? `${req.protocol}://${req.get("host")}/assets/employee/${result.image
          }`
          : null;

      res.send({
        status: 200,
        result: result,
      });
    } else {
      await Employee.findAndCountAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {},
          ],
        },
        order: [["id", "ASC"]],
        include: [
          { model: JobTitle, attributes: ["id", "name"] },
          { model: EmployeeStatus },
          { model: JobGrade, attributes: ["id", "name"] },
          { model: JobLevel, attributes: ["id", "name"] },
          {
            model: JobPosition,
            attributes: ["id", "name", "relation_code", "job_id"],
          },
        ],
        limit,
        offset,
      })
        .then(async (data) => {
          const response = getPagingData(data, page, limit);

          for (let i = 0; i < response.requests.length; i++) {
            const element = response.requests[i];
            const findSpv = await JobPosition.findOne({
              where: { id: element.jobposition.relation_code },
              include: { model: Employee, attributes: ["id", "firstName"] },
              raw: true,
              nest: true,
            });
            if (findSpv) {
              if (element.jobposition.relation_code != null) {
                if (element.jobposition.relation_code == findSpv.id) {
                  element.otherId = findSpv.employees.firstName;
                  element.setDataValue("relation_code_id", `${findSpv.job_id}`);
                }
              }
            } else {
              element.otherId = "";
              element.setDataValue("relation_code_id", ``);
            }
          }

          res.status(200).json({
            status: 200,
            result: response,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "failed",
            message: "Something went wrong! " + err.toString(),
          });
        });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error: " + err.toString(),
      error: err.toString(),
    });
  }
};
module.exports.getEmployeeName = async (req, res) => {
  try {
    const employee = await User.findAll({
      attributes: ["employeeId", "unique_id"],
      where: {
        employeeId: { [Op.not]: null },
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });
    var employee_id = [];
    employee.forEach((element) => {
      employee_id.push(element.employeeId);
    });
    const user = await Employee.findAll({
      where: {
        id: { [Op.not]: [1] },
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });
    res.send({
      status: 200,
      result: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    let result = await Employee.destroy({
      where: {
        id: req.query.id,
      },
    });

    let checkUser = await User.findOne({
      where: {
        employeeId: req.query.id,
      },
      raw: true,
      nest: true,
    });

    if (checkUser) {
      await User.destroy({
        where: {
          id: checkUser.id,
        },
      });
    }

    res.send({
      status: 200,
      message: "success delete employee",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateProfilePhoto = async (req, res) => {
  try {
    let pp;
    const findEmp = await Employee.findOne({
      where: {
        id: req.body.id
      }
    })

    if (!findEmp) {
      return res.errorNotFound("Employee not found 404")
    }

    pp = findEmp.image

    if (!req.file) {
      return res.errorBadRequest("Profile Photo is required");
    }

    const tempPath = req.file.path;
    pp = req.file.filename + "." + req.file.mimetype.split("/")[1];
    const targetPath = path.join(`assets/employee/${pp}`);
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
    });

    await Employee.update({
      image: pp,
    }, { where: { id: req.body.id } })

    return res.jsonSuccess("Success update profile photo")
  } catch (error) {
    return res.serverError("Error => " + error.toString())
  }
}

module.exports.updatePersonalDetail = async (req, res) => {
  try {
    await Employee.update(
      {
        firstName: req.body.firstName,
        otherId: req.body.otherId,
        driverLicence: req.body.driverLicence,
        licenceExpire: req.body.licenceExpire,
        nationality_id: req.body.idNationality,
        maritalStatus: req.body.maritalStatus,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.send({
      message: "success",
    });
  } catch (e) {
    res.send({
      message: e,
    });
  }
};

module.exports.updateContactDetail = async (req, res) => {
  try {
    await Employee.update(
      {
        street: req.body.street,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        country: req.body.country,
        phone: req.body.phone,
        mobilePhone: req.body.mobilePhone,
        email: req.body.email,
        otherEmail: req.body.otherEmail,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    res.send({
      message: "success",
    });
  } catch (e) {
    res.send({
      message: e,
    });
  }
};

module.exports.updateEmployee = async (req, res) => {
  try {
    const findData = await Employee.findOne({ where: { id: req.body.id } });
    let gambar = findData.image;
    let result;

    if (req.file) {
      fs.unlink(`assets/employee/${findData.image}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      const tempPath = req.file.path;
      gambar = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/employee/${gambar}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });

      result = await Employee.update(
        {
          image: gambar,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          otherId: req.body.employeeId,
          joinDate: req.body.joinDate,
          jobtitle_id: req.body.jobtitle_id,
          employeestatus_id: req.body.employeestatus_id,
          jobgrade_id: req.body.jobgrade_id,
          joblevel_id: req.body.joblevel_id,
          jobposition_id: req.body.jobposition_id,
          location: req.body.location,
        },
        { where: { id: req.body.id } }
      );
    } else {
      result = await Employee.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          otherId: req.body.employeeId,
          joinDate: req.body.joinDate,
          jobtitle_id: req.body.jobtitle_id,
          employeestatus_id: req.body.employeestatus_id,
          jobgrade_id: req.body.jobgrade_id,
          joblevel_id: req.body.joblevel_id,
          jobposition_id: req.body.jobposition_id,
          location: req.body.location,
        },
        { where: { id: req.body.id } }
      );
    }

    res.send({
      message: "Success update employee",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

// REPORT CTRL
module.exports.getReport = async (req, res) => {
  try {
    let data;

    if (req.query.id) {
      data = await Report.findOne({
        include: {
          model: Employee,
          include: [{ model: Nationality }, { model: Emergencycontact }],
        },
        where: {
          id: req.query.id,
        },
      });
    } else {
      data = await Report.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {},
          ],
        },
        order: [["id", "DESC"]],
      });
    }

    res.status(200).json({
      status: 200,
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.addReport = async (req, res) => {
  try {
    const result = await Report.create({
      name: req.body.name,
      employeeId: req.body.employeeId,
      criteria: req.body.criteria,
      include: req.body.include,
      displayFieldGroup: req.body.displayFieldGroup,
      displayField: req.body.displayField,
      unique_id: req.userData.unique_id,
    });
    res.json(
      result
        ? {
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
      error: err,
    });
  }
};

module.exports.deleteReport = async (req, res) => {
  try {
    const result = await Report.destroy({
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
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateReport = async (req, res) => {
  try {
    const result = await Report.update(
      {
        name: req.body.name,
        employeeId: req.body.employeeId,
        criteria: req.body.criteria,
        include: req.body.include,
        displayFieldGroup: req.body.displayFieldGroup,
        displayField: req.body.displayField,
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
      message: "Internal server error",
      error: err,
    });
  }
};

// REPORT METHOD CTRL
module.exports.getReportMethod = async (req, res) => {
  try {
    const data = await ReportMethod.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });

    res.status(200).json({
      status: 200,
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.addReportMethod = async (req, res) => {
  try {
    const result = await ReportMethod.create({
      name: req.body.name,
      unique_id: req.userData.unique_id,
    });
    res.json(
      result
        ? {
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
      error: err,
    });
  }
};

module.exports.deleteReportMethod = async (req, res) => {
  try {
    const result = await ReportMethod.destroy({
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
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateReportMethod = async (req, res) => {
  try {
    const result = await ReportMethod.update(
      {
        name: req.body.name,
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
      message: "Internal server error",
      error: err,
    });
  }
};

// TERMINATION REASON CTRL
module.exports.getTerminationReason = async (req, res) => {
  try {
    const data = await TerminationReason.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });

    res.status(200).json({
      status: 200,
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.addTerminationReason = async (req, res) => {
  try {
    const result = await TerminationReason.create({
      name: req.body.name,
      unique_id: req.userData.unique_id,
    });
    res.json(
      result
        ? {
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
      error: err,
    });
  }
};

module.exports.deleteTerminationReason = async (req, res) => {
  try {
    const result = await TerminationReason.destroy({
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
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.updateTerminationReason = async (req, res) => {
  try {
    const result = await TerminationReason.update(
      {
        name: req.body.name,
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
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.getDashboard = async (req, res) => {
  try {
    let employeeStatusData = [];
    let employeeJobTitleData = [];

    let totalEmployee = await Employee.count({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });
    let totalResignedEmployee = await EmployeeTermination.count({});
    let totalEmployeeMale = await Employee.count({
      where: {
        gender: "Laki - Laki",
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });
    let totalEmployeeFemale = await Employee.count({
      where: {
        gender: "Perempuan",
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
    });
    let totalAppliedEmployee = await Applicant.count();
    let totalNewEmployee = await Applicant.count({
      where: {
        status: 2,
      },
    });
    let employeeStatus = await EmployeeStatus.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
          {
            unique_id: null,
          },
        ],
      },
      include: {
        model: Employee,
        attributes: ["id"],
      },
    });
    let employeeJobtitle = await JobTitle.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {},
        ],
      },
      include: {
        model: Employee,
        attributes: ["id"],
      },
    });

    await employeeStatus.forEach((emp) => {
      employeeStatusData.push({
        id: emp.id,
        name: emp.name,
        count: emp.employees.length,
      });
    });
    await employeeJobtitle.forEach((emp) => {
      employeeJobTitleData.push({
        id: emp.id,
        name: emp.name,
        count: emp.employees.length,
      });
    });

    res.send({
      status: 200,
      result: {
        totalEmployee: totalEmployee,
        totalResignedEmployee: totalResignedEmployee,
        totalAppliedEmployee: totalAppliedEmployee,
        totalNewEmployee: totalNewEmployee,
        employeeStatusData: employeeStatusData,
        employeeJobTitleData: employeeJobTitleData,
        employeeGender: {
          male: totalEmployeeMale,
          female: totalEmployeeFemale,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.importJobManagement = async (req, res) => {
  try {
    var countFailed = 0;
    let file = "";
    const tempPath = req.file.path;

    file = req.file.filename + "." + req.file.mimetype.split("/")[1];

    const targetPath = await path.join(`assets/employee/${file}`);

    await fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
    });

    var workbook = await XLSX.readFile(`assets/employee/${file}`, {
      type: "binary",
      cellText: false,
      cellDates: true,
    });

    var jobGrade = XLSX.utils.sheet_to_json(workbook.Sheets["Job_Grade"], {
      header: 0,
      raw: false,
      dateNF: "yyyy-mm-dd",
    });

    var jobLevel = XLSX.utils.sheet_to_json(workbook.Sheets["Job_Level"], {
      header: 0,
      raw: false,
      dateNF: "yyyy-mm-dd",
    });

    var jobPosition = XLSX.utils.sheet_to_json(
      workbook.Sheets["Job_Position"],
      {
        header: 0,
        raw: false,
        dateNF: "yyyy-mm-dd",
      }
    );

    // var jobTitle = XLSX.utils.sheet_to_json(workbook.Sheets["Job_Title"], {
    //   header: 0,
    //   raw: false,
    //   dateNF: "yyyy-mm-dd",
    // });

    for (var i = 0; i < jobGrade.length; i++) {
      var data = jobGrade[i];
      let _jobGrade = await JobGrade.findOne({
        where: {
          name: data["Job Grade"],
        },
      });
      if (!_jobGrade) {
        await JobGrade.create({
          name: data["Job Grade"],
          type: data["Currency"],
          minsalary: data["Min Salary"],
          maxsalary: data["Max Salary"],
          unique_id: req.userData.unique_id,
        });
      } else {
        countFailed += 1;
      }
    }

    for (var i = 0; i < jobLevel.length; i++) {
      var data = jobLevel[i];
      let _jobGrade = await JobGrade.findOne({
        where: {
          name: data["Job Grade"],
        },
      });
      let _jobLevel = await JobLevel.findOne({
        where: {
          name: data["Level Name"],
          grade_id: _jobGrade?.id,
        },
      });

      if (!_jobLevel || !_jobGrade) {
        await JobLevel.create({
          name: data["Level Name"],
          grade_id: _jobGrade?.id,
          unique_id: req.userData.unique_id,
        });
      } else {
        countFailed += 1;
      }
    }

    for (var i = 0; i < jobPosition.length; i++) {
      var data = jobPosition[i];
      let _jobGrade = await JobGrade.findOne({
        where: {
          name: data["Job Grade"],
        },
      });
      if (data["Superior Id"] == "As Parent") {
        let _jobPosition = await JobPosition.findOne({
          where: {
            name: data["Position Name"],
            grade_id: _jobGrade?.id,
            job_id: data["Position Id"],
          },
        });
        if (!_jobPosition) {
          await JobPosition.create({
            name: data["Position Name"],
            grade_id: _jobGrade?.id,
            job_id: data["Position Id"],
            unique_id: req.userData.unique_id,
          });
        } else {
          countFailed += 1;
        }
      } else {
        var parents = await JobPosition.findOne({
          where: {
            job_id: data["Superior Id"],
          },
        });

        let _jobPosition = await JobPosition.findOne({
          where: {
            name: data["Position Name"],
            grade_id: _jobGrade?.id,
            relation_code: parents?.id,
            job_id: data["Position Id"],
          },
        });

        if (!_jobPosition) {
          await JobPosition.create({
            name: data["Position Name"],
            grade_id: _jobGrade?.id,
            relation_code: parents?.id,
            job_id: data["Position Id"],
            unique_id: req.userData.unique_id,
          });
        } else {
          countFailed += 1;
        }
      }
    }

    res.send({
      message: "success",
      failed: `${countFailed} Data`,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.importEmployee = async (req, res) => {
  try {
    let status_id = 0;
    let jobtitle_id = 0;
    let jobgrade_id = 0;
    let joblevel_id = 0;
    let jobposition_id = 0;
    let nationality_id = 0;

    let file = "";
    const tempPath = req.file.path;

    file = req.file.filename + "." + req.file.mimetype.split("/")[1];

    const targetPath = await path.join(`assets/employee/${file}`);

    await fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
    });

    var workbook = await XLSX.readFile(`assets/employee/${file}`, {
      type: "binary",
      cellText: false,
      cellDates: true,
    });

    var xlData = await XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"], {
      header: 0,
      raw: false,
      dateNF: "yyyy-mm-dd",
    });

    for (let i = 0; i < xlData.length; i++) {
      const element = xlData[i];
      const findEmpStatus = await EmployeeStatus.findOne({
        where: {
          name:
            element.Status != undefined || element.Status != null
              ? element.Status
              : null,
        },
      });

      if (findEmpStatus != null) {
        status_id = findEmpStatus.id;
      }

      const findJobTitle = await JobTitle.findOne({
        where: {
          name:
            element["Job Title"] != undefined || element["Job Title"] != null
              ? element["Job Title"]
              : null,
        },
      });

      if (findJobTitle != null) {
        jobtitle_id = findJobTitle.id;
      }

      const findJobGrade = await JobGrade.findOne({
        where: {
          name:
            element["Job Grade"] != undefined || element["Job Grade"] != null
              ? element["Job Grade"]
              : null,
        },
      });

      if (findJobGrade != null) {
        jobgrade_id = findJobGrade.id;
      }

      const findJobLevel = await JobLevel.findOne({
        where: {
          name:
            element["Job Level"] != null || element["Job Level"] != undefined
              ? element["Job Level"]
              : null,
        },
      });

      if (findJobLevel != null) {
        joblevel_id = findJobLevel.id;
      }

      const findJobPosition = await JobPosition.findOne({
        where: {
          name:
            element["Job Position"] != undefined ||
              element["Job Position"] != null
              ? element["Job Position"]
              : null,
        },
      });

      if (findJobPosition != null) {
        jobposition_id = findJobPosition.id;
      }

      if (element.Nationality) {
        const findNationality = await Nationality.findOne({
          where: {
            unique_id: req.userData.unique_id,
            name:
              element.Nationality != undefined || element.Nationality != null
                ? element.Nationality
                : null,
          },
        });

        if (findNationality != null) {
          nationality_id = findNationality.id;
        }
      }

      const result = await Employee.create({
        firstName: element["Full Name"],
        gender: element.Gender,
        otherId: element.NIK,
        email: element.Email,
        joinDate: element["Joined Date"],
        jobtitle_id: jobtitle_id,
        employeestatus_id: status_id,
        jobgrade_id: jobgrade_id,
        joblevel_id: joblevel_id,
        jobposition_id: jobposition_id,
        location: element.Location,
        npwp: element.NPWP,
        religion: element.Religion,
        contractStart: element["Start Contract"],
        contractEnd: element["End Contract"],
        nationality_id: nationality_id,
        birthDate: element["Birth Date"],
        maritalStatus: element["Marital Status"],
        driverLicence: element["Driver License"],
        licenceExpire: element["Driver License Expiry"],
        street: element.Address,
        city: element.City,
        province: element.Province,
        postalCode: element["Postal Code"],
        country: element.Country,
        phone: element["Phone Number"],
        position_id: element["Position Id"],
        superior_title: element["Superior Title"],
        superior_id: element["Superior Id"],
        unique_id: req.userData.unique_id,
      });
      const password = await bcrypt
        .hash(element["Full Name"], 12)
        .then((hash) => {
          return hash;
        });
      await User.create({
        employeeId: result.id,
        role_id: 5,
        parent_role_id: 4,
        username: element["Full Name"],
        name: element["Full Name"],
        password: password,
        unique_id: req.userData.unique_id,
        status: "Enable",
        location: element.Location,
      });

      if (findJobPosition != null) {
        // cari atasan
        const findRelation = await JobPosition.findOne({
          where: {
            id: findJobPosition.relation_code,
          },
          include: {
            model: Employee,
            attributes: ["id", "firstName"],
          },
        });
        // cari bawahan
        const findBawahan = await JobPosition.findOne({
          where: {
            relation_code: jobposition_id,
          },
          include: {
            model: Employee,
            attributes: ["id", "firstName"],
          },
        });

        if (
          findRelation &&
          findRelation.employees &&
          findRelation.employees != null
        ) {
          if (findRelation.employees && findRelation.employees.length > 0) {
            findRelation.employees.map(async (emp) => {
              await ReportTo.create({
                name: emp.firstName,
                status: "supervisor",
                reporting_method_id: 1, // direct = 1, indirect = 2
                structureId: "",
                employeeId: result.id,
                reportToEmployee: emp.id,
              });

              // menambah data subordinate pada si atasan employee
              await ReportTo.create({
                name: element["Full Name"],
                status: "subordinate",
                reporting_method_id: 1,
                structureId: "",
                employeeId: emp.id,
                reportToEmployee: result.id,
              });
            });
          }
        }

        if (findBawahan && findBawahan.employees.length > 0) {
          findBawahan.employees.map(async (emp) => {
            await ReportTo.create({
              name: emp.firstName,
              status: "subordinate",
              reporting_method_id: 1, // direct = 1, indirect = 2
              structureId: "",
              employeeId: result.id,
              reportToEmployee: emp.id,
            });
            await ReportTo.create({
              name: element["Full Name"],
              status: "supervisor",
              reporting_method_id: 1, // direct = 1, indirect = 2
              structureId: "",
              employeeId: emp.id,
              reportToEmployee: result.id,
            });
          });
        }
      }
    }

    res.send({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.bulkImport = async (req, res) => {
  try {
    let file = "";
    const tempPath = req.file.path;

    file = req.file.filename + "." + req.file.mimetype.split("/")[1];

    const targetPath = await path.join(`assets/employee/${file}`);

    await fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
    });

    // const result = xlsx.parse(`assets/employee/${file}`)
    var workbook = XLSX.readFile(`assets/employee/${file}`, {
      type: "binary",
      cellText: false,
      cellDates: true,
    });

    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets["DATABASE"], {
      header: 0,
      raw: false,
      dateNF: "yyyy-mm-dd",
    });

    // FILTER DUPLICATE JOB GRADE
    const jobGrade = xlData.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t["Job Grade"] === value["Job Grade"])
    );
    // FILTER DUPLICATE JOB LEVEL
    const jobLevel = xlData.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t["Job Level"] === value["Job Level"])
    );
    // FILTER DUPLICATE JOB TITLE
    const jobTitle = xlData.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t["Job Title"] === value["Job Title"])
    );

    // FILTER DUPLICATE JOB POSITION
    const jobPosition = xlData.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t["Job Position"] === value["Job Position"])
    );
    console.log("JOB GRADES: ", jobGrade.length);
    console.log("JOB LEVEL: ", jobLevel.length);
    // PROSES INSERT DATA SEMUA JOBS KE DATABASE BESERTA SET RELATION CODE NYA
    // ...

    // PROSES INSER DATA SEMUA EMPLOYEE KE DATABASE TIDAK TERMASUK KOLOM JOB GRADE, LEVEL, TITLE, DAN POSITION DI EXCEL
    // ...

    // for (let i = 0; i < xlData.length; i++) {
    //   const data1 = xlData[i];

    res.jsonSuccess("Success bulk import");
  } catch (error) {
    res.serverError("Error => " + error.toString());
  }
};

module.exports.terminate = async (req, res) => {
  try {
    const findData = await EmployeeTermination.findOne({
      where: {
        employeeId: req.body.employeeId,
      },
    });

    if (findData) {
      const update = await EmployeeTermination.update(
        {
          date: req.body.date,
          termination_reason_id: req.body.termination_reason_id,
          note: req.body.note,
        },
        { where: { employeeId: req.body.employeeId } }
      );
    } else {
      const create = await EmployeeTermination.create({
        employeeId: req.body.employeeId,
        date: req.body.date,
        termination_reason_id: req.body.termination_reason_id,
        note: req.body.note,
        unique_id: req.userData.unique_id,
      });
    }

    res.send({
      message: "Success terminate",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.getTerminate = async (req, res) => {
  try {
    const findData = await EmployeeTermination.findOne({
      where: {
        employeeId: req.query.id_employee,
      },
      include: {
        model: TerminationReason,
      },
    });

    res.send({
      message: "Success get terminate",
      result: findData,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.filterEmployee = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const {
      employeestatus,
      supervisor,
    } = req.body;

    console.log(employeestatus);
    console.log(supervisor);

    const data = await Employee.findAndCountAll({
      where: { unique_id: req.userData.unique_id },
      order: [["id", "ASC"]],
      limit,
      offset,
      include: [
        {
          model: JobTitle,
          attributes: ["id", "name"],
        },
        {
          model: EmployeeStatus,
          where: {
            [Op.or]: [
              {
                name: employeestatus
              }
            ]
          }
        },
        { model: JobGrade, attributes: ["id", "name"] },
        { model: JobLevel, attributes: ["id", "name"] },
        {
          model: JobPosition,
          attributes: ["id", "name", "relation_code", "job_id"],
        },
      ],
    });

    const response = getPagingData(data, page, limit)

    for (let i = 0; i < response.requests.length; i++) {
      const element = response.requests[i];
      const findSpv = await JobPosition.findOne({
        where: { id: element.jobposition.relation_code },
        include: { model: Employee, attributes: ["id", "firstName"] },
        raw: true,
        nest: true,
      });
      if (findSpv) {
        if (element.jobposition.relation_code != null) {
          if (element.jobposition.relation_code == findSpv.id) {
            element.otherId = findSpv.employees.firstName;
            element.relation_code_id = `${findSpv.job_id}`;
          }
        }
      } else {
        element.otherId = "";
        element.relation_code_id = "";
      }
    }

    res.status(200).json({
      status: 200,
      result: response,
    });

    // if (jobtitle && employeestatus && supervisor) {
    //   await Employee.findAndCountAll({
    //     where: {
    //       unique_id: req.userData.unique_id,
    //     },
    //     order: [["id", "ASC"]],
    //     include: [
    //       {
    //         model: JobTitle,
    //         attributes: ["id", "name"],
    //         where: {
    //           name: jobtitle,
    //         },
    //       },
    //       {
    //         model: EmployeeStatus,
    //         where: {
    //           name: employeestatus,
    //         },
    //       },
    //       { model: JobGrade, attributes: ["id", "name"] },
    //       { model: JobLevel, attributes: ["id", "name"] },
    //       {
    //         model: JobPosition,
    //         attributes: ["id", "name", "relation_code", "job_id"],
    //       },
    //     ],
    //     limit,
    //     offset,
    //   })
    //     .then(async (data) => {
    //       const response = getPagingData(data, page, limit);

    //       for (let i = 0; i < response.requests.length; i++) {
    //         const element = response.requests[i];
    //         const findSpv = await JobPosition.findOne({
    //           where: { id: element.jobposition.relation_code },
    //           include: { model: Employee, attributes: ["id", "firstName"] },
    //           raw: true,
    //           nest: true,
    //         });
    //         if (findSpv) {
    //           if (element.jobposition.relation_code != null) {
    //             if (element.jobposition.relation_code == findSpv.id) {
    //               element.otherId = findSpv.employees.firstName;
    //               element.setDataValue("relation_code_id", `${findSpv.job_id}`);
    //             }
    //           }
    //         } else {
    //           element.otherId = "";
    //           element.setDataValue("relation_code_id", ``);
    //         }
    //       }

    //       res.status(200).json({
    //         status: 200,
    //         result: response,
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(400).json({
    //         status: "failed",
    //         message: "Something went wrong! " + err.toString(),
    //       });
    //     });
    // } else if (jobtitle) {
    //   await Employee.findAndCountAll({
    //     where: {
    //       [Op.or]: [
    //         {
    //           unique_id: req.userData.unique_id,
    //         },
    //         {},
    //       ],
    //     },
    //     order: [["id", "ASC"]],
    //     include: [
    //       {
    //         model: JobTitle,
    //         attributes: ["id", "name"],
    //         where: {
    //           name: jobtitle,
    //         },
    //       },
    //       { model: EmployeeStatus },
    //       { model: JobGrade, attributes: ["id", "name"] },
    //       { model: JobLevel, attributes: ["id", "name"] },
    //       {
    //         model: JobPosition,
    //         attributes: ["id", "name", "relation_code", "job_id"],
    //       },
    //     ],
    //     limit,
    //     offset,
    //   })
    //     .then(async (data) => {
    //       const response = getPagingData(data, page, limit);

    //       for (let i = 0; i < response.requests.length; i++) {
    //         const element = response.requests[i];
    //         const findSpv = await JobPosition.findOne({
    //           where: { id: element.jobposition.relation_code },
    //           include: { model: Employee, attributes: ["id", "firstName"] },
    //           raw: true,
    //           nest: true,
    //         });
    //         if (findSpv) {
    //           if (element.jobposition.relation_code != null) {
    //             if (element.jobposition.relation_code == findSpv.id) {
    //               element.otherId = findSpv.employees.firstName;
    //               element.setDataValue("relation_code_id", `${findSpv.job_id}`);
    //             }
    //           }
    //         } else {
    //           element.otherId = "";
    //           element.setDataValue("relation_code_id", ``);
    //         }
    //       }

    //       res.status(200).json({
    //         status: 200,
    //         result: response,
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(400).json({
    //         status: "failed",
    //         message: "Something went wrong! " + err.toString(),
    //       });
    //     });
    // } else if (employeestatus) {
    //   await Employee.findAndCountAll({
    //     where: {
    //       [Op.or]: [
    //         {
    //           unique_id: req.userData.unique_id,
    //         },
    //         {},
    //       ],
    //     },
    //     order: [["id", "ASC"]],
    //     include: [
    //       { model: JobTitle, attributes: ["id", "name"] },
    //       {
    //         model: EmployeeStatus,
    //         where: {
    //           name: employeestatus,
    //         },
    //       },
    //       { model: JobGrade, attributes: ["id", "name"] },
    //       { model: JobLevel, attributes: ["id", "name"] },
    //       {
    //         model: JobPosition,
    //         attributes: ["id", "name", "relation_code", "job_id"],
    //       },
    //     ],
    //     limit,
    //     offset,
    //   })
    //     .then(async (data) => {
    //       const response = getPagingData(data, page, limit);

    //       for (let i = 0; i < response.requests.length; i++) {
    //         const element = response.requests[i];
    //         const findSpv = await JobPosition.findOne({
    //           where: { id: element.jobposition.relation_code },
    //           include: { model: Employee, attributes: ["id", "firstName"] },
    //           raw: true,
    //           nest: true,
    //         });
    //         if (findSpv) {
    //           if (element.jobposition.relation_code != null) {
    //             if (element.jobposition.relation_code == findSpv.id) {
    //               element.otherId = findSpv.employees.firstName;
    //               element.setDataValue("relation_code_id", `${findSpv.job_id}`);
    //             }
    //           }
    //         } else {
    //           element.otherId = "";
    //           element.setDataValue("relation_code_id", ``);
    //         }
    //       }

    //       res.status(200).json({
    //         status: 200,
    //         result: response,
    //       });
    //     })
    //     .catch((err) => {
    //       res.status(400).json({
    //         status: "failed",
    //         message: "Something went wrong! " + err.toString(),
    //       });
    //     });
    // }
  } catch (error) {
    res.serverError("Internal server error " + error.toString());
  }
};

module.exports.filterEmployeeWithJob = async (req, res) => {
  try {
    const data = await Employee.findAll({
      attributes: ["id", "firstName"],
      where: {
        unique_id: req.userData.unique_id,
        [Op.or]: [
          {
            jobgrade_id: req.body.jobgrade,
          },
          {
            joblevel_id: req.body.joblevel,
          },
          {
            jobtitle_id: req.body.jobtitle,
          },
          {
            jobposition_id: req.body.jobposition,
          },
        ],
      },
    });
    res.jsonData(data);
  } catch (error) {
    res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.getCurrentBirthday = async (req, res) => {
  try {
    let employeeHappyBirthDay = [];
    const employees = await Employee.findAll({
      where: {
        unique_id: req.userData.unique_id,
      },
      attributes: ["id", "firstName", "birthDate", "image"],
      include: {
        model: JobTitle,
        attributes: ["id", "name"],
      },
    });

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    employees.map((emp) => {
      if (emp.birthDate) {
        if (new Date().getMonth() == new Date(emp.birthDate).getMonth()) {
          employeeHappyBirthDay.push(emp);
        }
      }

      // if(new Date().getDate() == new Date(emp.birthDate).getDate() && new Date().getMonth() == new Date(emp.birthDate).getMonth()) {
      //   await pushInbox({
      //     to_employee: emp.id,
      //     employeeId: emp.id,
      //     title: `Today is ${emp.firstName} birthday!`,
      //     message: `don't forget to congratulate him!`,
      //     unique_id: req.userData.unique_id
      //   })
      // }
    });
    res.jsonData({
      current_month: monthNames[new Date().getMonth()],
      employeesHappyBirthDay: employeeHappyBirthDay,
    });
  } catch (error) {
    res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.getEmployeePayroll = async (req, res) => {
  try {
    const findData = await EmployeePayroll.findOne({
      where: {
        employeeId: req.query.id_employee,
      },
      include: [
        {
          model: Employee,
        },
        {
          model: PayrollComponent,
        },
      ],
    });

    if (findData.payroll_component != null) {
      if (findData.payroll_component.incomes != null) {
        findData.payroll_component.incomes = JSON.parse(
          findData.payroll_component.incomes
        );
      }
      if (findData.payroll_component.deductions != null) {
        findData.payroll_component.deductions = JSON.parse(
          findData.payroll_component.deductions
        );
      }
      if (findData.payroll_component.benefits != null) {
        findData.payroll_component.benefits = JSON.parse(
          findData.payroll_component.benefits
        );
      }
    }

    res.send({
      result: findData,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};

module.exports.set_payroll = async (req, res) => {
  try {
    const findData = await EmployeePayroll.findOne({
      where: {
        employeeId: req.body.employeeId,
      },
    });

    if (findData) {
      const update = await EmployeePayroll.update(
        {
          employeeId: req.body.employeeId,
          ptkp_status: req.body.ptkp_status,
          salary_type: req.body.salary_type,
          prorate: req.body.prorate,
          npp_bpjs: req.body.npp_bpjs,
          tax_config: req.body.tax_config,
          salary_tax: req.body.salary_tax,
          bpjs_kesehatan: req.body.bpjs_kesehatan,
          bpjs_ketenagakerjaan: req.body.bpjs_ketenagakerjaan,
          npwp: req.body.npwp,
          bank: req.body.bank,
          bank_name: req.body.bank_name,
          bank_number: req.body.bank_number,
        },
        { where: { employeeId: req.body.employeeId } }
      );
    } else {
      const create = await EmployeePayroll.create({
        employeeId: req.body.employeeId,
        ptkp_status: req.body.ptkp_status,
        salary_type: req.body.salary_type,
        prorate: req.body.prorate,
        npp_bpjs: req.body.npp_bpjs,
        tax_config: req.body.tax_config,
        salary_tax: req.body.salary_tax,
        bpjs_kesehatan: req.body.bpjs_kesehatan,
        bpjs_ketenagakerjaan: req.body.bpjs_ketenagakerjaan,
        npwp: req.body.npwp,
        bank: req.body.bank,
        bank_name: req.body.bank_name,
        bank_number: req.body.bank_number,
      });
    }

    res.send({
      message: "Success set payroll",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};
