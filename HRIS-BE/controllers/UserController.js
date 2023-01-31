const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const EmployeeStatus = require("../models/Employeestatus.js");
const { generateUniqueCode2 } = require("../utilities/generate.js");
const Workshift = require("../models/Workshift.js");
const Nationality = require("../models/Nationality.js");
const Companylocation = require("../models/Companylocation.js");
const {
  JobTitle,
  JobGrade,
  JobLevel,
  JobPosition,
} = require("../models/JobModels.js");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const Role = require("../models/Role.js");

module.exports.addUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({
      where: {
        username: req.body.username,
      },
      attributes: ["id", "username"],
    });

    if (checkUser) {
      return res.status(400).json({
        status: 400,
        message: "Username already exist!",
      });
    }

    if (req.body.password.length < 8) {
      return res.status(400).json({
        status: 400,
        message: "Password must more than 8 character",
      });
    }

    const checkEmp = await User.findOne({
      where: {
        employeeId: req.body.employee_id,
      },
    });

    if (checkEmp) {
      return res.status(400).json({
        status: 400,
        message: `User with the employee name selected already exist!`,
      });
    }

    const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
      return hash;
    });
    const result = await User.create({
      role_id: req.body.role_id,
      parent_role_id: req.userData.role_id,
      name: req.body.name,
      employeeId: req.body.employee_id,
      username: req.body.username,
      location: req.body.location,
      password: password,
      unique_id:
        req.body.role_id == 3 || req.body.role_id == 5
          ? req.userData.unique_id
          : generateUniqueCode2(req.userData.unique_id),
    });

    res.send({
      status: 200,
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

module.exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
        return hash;
      });
      const result = await User.update(
        {
          role: req.body.role,
          name: req.body.name,
          employeeId: req.body.employee_id,
          status: req.body.status,
          username: req.body.username,
          location: req.body.location,
          password: password,
        },
        { where: { id: req.body.id } }
      );
    } else {
      const result = await User.update(
        {
          role: req.body.role,
          name: req.body.name,
          status: req.body.status,
          employeeId: req.body.employee_id,
          username: req.body.username,
          location: req.body.location,
        },
        { where: { id: req.body.id } }
      );
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
module.exports.deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
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
module.exports.getUser = async (req, res) => {
  try {
    let result;

    if (req.query.keyword) {
      result = await await User.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
          ],
        },
        include: [{
          model: Employee,
          where: {
            [Op.or]: [
              {
                firstName: { [Op.like]: `%${req.query.keyword}%` },
              },
              {
                lastName: { [Op.like]: `%${req.query.keyword}%` },
              },
            ],
          },
        }, {
          model: Role,
          as: "roles"
        }],
        raw: true,
        nest: true,
      });
    } else {
      result = await User.findAll({
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
        include: [{
          model: Employee,
        }, {
          model: Role,
          as: "roles"
        }],
      });
    }

    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error: " + err.toString(),
      error: err,
    });
  }
};
module.exports.getImage = async (req, res) => {
  try {
    fs.readFile(req.body.path, function (err, data) {
      if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data); // Send the file data to the browser.
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.filterUser = async (req, res) => {
  console.log("TEST LOGGER");
  try {
    let result;

    if (req.body.role && req.body.status) {
      console.log("KE IF 1");
      result = await User.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
              status: req.body.status,
            },
          ],
        },
        include: [{
          model: Employee,
        }, {
          model: Role,
          as: "roles",
          where: {
            name: req.body.role
          }
        }],
        raw: true,
        nest: true,
      });
    } else if (req.body.role) {
      result = await User.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {

            },
          ],
        },
        include: [{
          model: Employee,
        }, {
          model: Role,
          as: "roles",
          where: {
            name: req.body.role
          }
        }],
        raw: true,
        nest: true,
      });
    } else if (req.body.status) {
      result = await User.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
            {
              status: req.body.status,
            },
          ],
        },
        include: {
          model: Employee,
        },
        raw: true,
        nest: true,
      });
    } else {
      console.log("KE ELSE");
      result = await User.findAll({
        where: {
          [Op.or]: [
            {
              unique_id: req.userData.unique_id,
            },
          ],
        },
        include: {
          model: Employee,
        },
        raw: true,
        nest: true,
      });
    }

    res.send({
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

module.exports.getProfile = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.user,
      },
      include: [{
        model: Employee,
        include: [
          { model: JobTitle },
          { model: JobPosition },
          { model: Nationality },
          { model: EmployeeStatus },
          { model: Workshift },
        ],
      }, {
        model: Role,
        as: "roles"
      }],
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

module.exports.updateProfile = async (req, res) => {
  try {
    const data = await Employee.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        otherId: req.body.otherId,
        driverLicence: req.body.driverLicence,
        licenceExpire: req.body.licenceExpire,
        nationality_id: req.body.nationality_id,
        maritalStatus: req.body.maritalStatus,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
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
      { where: { id: req.userData.employee.id } }
    );

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

module.exports.getUserData = async (req, res) => {
  try {
    const data = await User.findOne({
      where: {
        id: req.user,
      },
      attributes: {
        exclude: ["password"],
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName", "lastName", "image"],
        include: {
          model: JobPosition,
        },
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

module.exports.getUserJob = async (req, res) => {
  try {
    let data;

    if (req.query.id_employee) {
      data = await Employee.findOne({
        where: {
          id: req.query.id_employee,
        },
        attributes: [
          "id",
          "joinDate",
          "location",
          "jobtitle_id",
          "jobgrade_id",
          "joblevel_id",
          "jobposition_id",
          "contractStart",
          "contractEnd",
          "contractFile",
        ],
        include: {
          model: JobTitle,
        },
      });
    } else {
      data = await Employee.findOne({
        where: {
          id: req.userData.employee.id,
        },
        attributes: [
          "id",
          "joinDate",
          "location",
          "jobtitle_id",
          "jobgrade_id",
          "joblevel_id",
          "jobposition_id",
          "contractStart",
          "contractEnd",
          "contractFile",
        ],
        include: {
          model: JobTitle,
        },
      });
    }

    const job = await JobGrade.findOne({
      where: {
        id: data.jobgrade_id,
      },
      attributes: ["id", "name"],
    });

    const job2 = await JobTitle.findOne({
      where: {
        id: data.jobtitle_id,
      },
      attributes: ["id", "name"],
    });
    const job3 = await JobLevel.findOne({
      where: {
        id: data.joblevel_id,
      },
      attributes: ["id", "name"],
    });
    const job4 = await JobPosition.findOne({
      where: {
        id: data.jobposition_id,
      },
      attributes: ["id", "name"],
    });

    res.status(200).json({
      status: 200,
      result: {
        employeeId: data.id,
        joinDate: data.joinDate,
        location: data.location,
        jobGrade: job,
        jobTitle: job2,
        jobLevel: job3,
        jobPosition: job4,
        contractStart: data.contractStart,
        contractEnd: data.contractEnd,
        contractFile: `${req.protocol}://${req.get("host")}/assets/contract/${data.contractFile
          }`,
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

module.exports.updateUserJob = async (req, res) => {
  try {
    const find = await Employee.findOne({
      where: { id: req.userData.employee.id },
      raw: true,
      nest: true,
    });
    let contractFileName = find.contractFile;

    if (req.file) {
      fs.unlink(`assets/contract/${find.contractFile}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      const tempPath = req.file.path;
      contractFileName =
        req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/contract/${contractFileName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.query.id_employee) {
      const data = await Employee.update(
        {
          jobtitle_id: req.body.jobtitle_id,
          joblevel_id: req.body.joblevel_id,
          jobposition_id: req.body.jobposition_id,
          location: req.body.location,
          contractStart: req.body.contractStart,
          contractEnd: req.body.contractEnd,
          contractFile: contractFileName,
        },
        { where: { id: req.query.id_employee } }
      );
    } else {
      const data = await Employee.update(
        {
          jobtitle_id: req.body.jobtitle_id,
          joblevel_id: req.body.joblevel_id,
          jobposition_id: req.body.jobposition_id,
          location: req.body.location,
          contractStart: req.body.contractStart,
          contractEnd: req.body.contractEnd,
          contractFile: contractFileName,
        },
        { where: { id: req.userData.employee.id } }
      );
    }

    res.status(200).json({
      status: 200,
      message: "Success update user job and contract",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.getCompanyName = async (req, res) => {
  try {
    const company_name = await Companylocation.findOne({
      where: {
        unique_id: req.userData.unique_id,
      },
      attributes: ["id", "name"]
    })

    res.jsonData(company_name)
  } catch (error) {
    res.serverError("Error => " + error.toString())
  }
}