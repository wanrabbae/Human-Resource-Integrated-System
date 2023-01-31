const Subsdiary = require("../models/Subsdiary");
const User = require("../models/User.js");
const { Op } = require("sequelize");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { generateUniqueCode2 } = require("../utilities/generate.js");
const {JobPosition, JobGrade, JobLevel, JobTitle} = require("../models/JobModels.js")
const EmployeeRecord = require("../models/EmployeeRecord.js");
const Employee = require("../models/Employee.js");
const EmployeeTermination = require("../models/EmployeeTermination.js")
const Applicant = require("../models/Applicant.js")
const db = require("../config/database.js")

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

module.exports.getSubsdiary = async (req, res) => {
  try {
    let data;

    if(req.query.keyword) {
      console.log("MASUK KE KEYWORD");
      data = await Subsdiary.findAll({
        where: {
          [Op.or]: [
            {
              fullname: `%${req.query.keyword}%`
            },
            {
              register_number: `%${req.query.keyword}%`
            },
          ]
        },
        include: {
          model: User,
          as: "user",
          where: {
            [Op.or]: [
              // {
              //   unique_id: req.userData.unique_id,
              // },
              // {
              //   unique_id: { [Op.like]: `${req.userData.unique_id}%` },
              // },
              // {
              //   username: `%${req.query.keyword}%`
              // },
              // {
              //   status: `%${req.query.keyword}%`
              // },
            ],
          },
          attributes: {
            exclude: ["password"],
          },
        },
        raw: true,
        nest: true,
      });
      data.map((dt) => {
        if (dt.logo != null) {
          dt.logo = `${req.protocol}://${req.get("host")}/assets/subsdiary/${
            dt.logo
          }`;
        } else {
          dt.logo = null;
        }
      });
    }else {
      data = await Subsdiary.findAll({
        include: {
          model: User,
          as: "user",
          where: {
            [Op.or]: [
              {
                unique_id: req.userData.unique_id,
              },
              {
                unique_id: { [Op.like]: `${req.userData.unique_id}%` },
              },
            ],
          },
          attributes: {
            exclude: ["password"],
          },
        },
        raw: true,
        nest: true,
      });
      data.map((dt) => {
        if (dt.logo != null) {
          dt.logo = `${req.protocol}://${req.get("host")}/assets/subsdiary/${
            dt.logo
          }`;
        } else {
          dt.logo = null;
        }
      });
    }
    
    return res.jsonData(data);
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.addSubsdiary = async (req, res) => {
  try {
    let gambar = "";
    let result;

    if (req.body.password != req.body.password_confirm) {
      return res.errorBadRequest("Password confirmation doesn't match!");
    }

    if (req.file) {
      const tempPath = req.file.path;
      gambar = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/subsdiary/${gambar}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
      return hash;
    });

    const createUser = await User.create({
      unique_id: generateUniqueCode2(req.userData.unique_id),
      role_id: 4,
      status: req.body.status,
      name: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    const create = await Subsdiary.create({
      user_id: createUser.id,
      logo: gambar,
      fullname: req.body.fullname,
      register_number: req.body.register_number,
      tax_id: req.body.tax_id,
      fax: req.body.fax,
      phone: req.body.phone,
      address1: req.body.address_1,
      address2: req.body.address_2,
      city: req.body.city,
      province: req.body.province,
      postal_code: req.body.postal_code,
      country: req.body.country,
      notes: req.body.notes,
    });

    return res.jsonSuccess("Success create subsdiary");
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.updateSubsdiary = async (req, res) => {
  try {
    const findData = await Subsdiary.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        as: "user",
      },
    });
    let gambar = findData.logo;
    let result;
    let password = findData.user.password;

    if (req.body.password) {
      if (req.body.password != req.body.password_confirm) {
        return res.errorBadRequest("Password confirmation doesn't match!");
      }

      password = await bcrypt.hash(req.body.password, 12).then((hash) => {
        return hash;
      });
    }

    if (req.file) {
      if (findData.logo != null) {
        fs.unlink(`assets/subsdiary/${findData.logo}`, (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
      }
      const tempPath = req.file.path;
      gambar = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/subsdiary/${gambar}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    const updateUser = await User.update(
      {
        status: req.body.status,
        username: req.body.username,
        email: req.body.email,
        password: password,
      },
      {
        where: {
          id: findData.user_id,
        },
      }
    );

    const update = await Subsdiary.update(
      {
        logo: gambar,
        fullname: req.body.fullname,
        register_number: req.body.register_number,
        tax_id: req.body.tax_id,
        fax: req.body.fax,
        phone: req.body.phone,
        address1: req.body.address_1,
        address2: req.body.address_2,
        city: req.body.city,
        province: req.body.province,
        postal_code: req.body.postal_code,
        country: req.body.country,
        notes: req.body.notes,
      },
      {
        where: {
          id: findData.id,
        },
      }
    );

    return res.jsonSuccess("Success updated subsdiary");
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.deleteSubsdiary = async (req, res) => {
  try {
    const find = await Subsdiary.findByPk(req.params.id);

    if (find) {
      if (find.logo != null) {
        fs.unlink(`assets/subsdiary/${find.logo}`, (err) => {
          if (err) throw err;
          console.log("path/file.txt was deleted");
        });
      }
      await Subsdiary.destroy({
        where: {
          id: req.params.id,
        },
      });

      await User.destroy({
        where: {
          id: find.user_id,
        },
      });
    }

    return res.jsonSuccess("Success delete subsdiary");
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

module.exports.getDashboard = async (req, res) => {
  try {
    let totalEmployee = await Employee.count({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let totalResignedEmployee = await EmployeeTermination.count({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let totalAppliedEmployee = await Applicant.count({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let totalNewEmployee = await Applicant.count({
      where: {
        unique_id: req.query.unique_id,
        status: 2,
      },
    });
    res.status(200).json({
      status: 200,
      result: {
        totalEmployee: totalEmployee,
        totalResignedEmployee: totalResignedEmployee,
        totalAppliedEmployee: totalAppliedEmployee,
        totalNewEmployee: totalNewEmployee,
      },
    });
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

module.exports.getJob = async (req, res) => {
  try {
    let jobPosi = await JobPosition.findAll({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let jobTitle = await JobTitle.findAll({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let jobGrade = await JobGrade.findAll({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    let jobLevel = await JobLevel.findAll({
      where: {
        unique_id: req.query.unique_id,
      },
    });
    res.status(200).json({
      status: 200,
      result: {
        jobGrade: jobGrade,
        jobLevel: jobLevel,
        jobTitle: jobTitle,
        jobPosition: jobPosi,
      },
    });
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

module.exports.getAttendance = async (req, res) => {
  const { page, size } = req.query;
 const { limit, offset } = getPagination(page, size);
    await EmployeeRecord.findAndCountAll({
      where: {
        unique_id: req.query.unique_id
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
            err: error.toString(),
          });
  });
}

module.exports.getCodeStructure = async (req, res) => {
  var result = await db.query(
    `SELECT * FROM jobpositions WHERE id=${req.query.id} AND unique_id='${req.query.unique_id}'`,
    { raw: true, nest: true }
  );
  var kode =
    result[0]["relation_code"] != null
      ? `${result[0]["relation_code"]}${result[0]["job_id"]}`
      : result[0]["job_id"];
  res.send({ result: kode });
};

module.exports.getStructure = async (req, res) => {
  try {
    var result;
    if (req.query.ket) {
      result = await db.query(`SELECT * FROM organizations WHERE unique_id='${req.query.unique_id}'`, {
        raw: true,
        nest: true,
      });
      for (var x = 0; x < result.length; x++) {
        result[x]["position"] = await JobPosition.findOne({
          where: {
            id: result[x]["position_id"],
          },
        });
      }
    } else {
      // result = await db.query("SELECT * FROM organizations WHERE sequence IS NULL",{raw: true, nest: true});
      // var child = [];
      // for (var i=0;i < result.length;i++) {
      //     const children = await db.query(`SELECT * FROM organizations WHERE sequence=${result[i]['id']}`,{raw: true, nest: true});
      //     result[i]['position'] = await JobPosition.findOne({
      //         where: {
      //             id: result[i]['position_id'],
      //         }
      //     });
      //     result[i]['structure_id'] = result[i]['position']['job_id'];
      //     result[i]['children'] = children;
      //     for (var x=0;x < result[i]['children'].length;x++) {
      //         const data = await db.query(`SELECT * FROM organizations WHERE sequence=${result[i]['children'][x]['id']}`,{raw: true, nest: true});
      //          result[i]['children'][x]['position'] = await JobPosition.findOne({
      //                 where: {
      //                     id: result[i]['children'][x]['position_id'],
      //                 }
      //             });
      //         result[i]['children'][x]['structure_id'] = `${result[i]['position']['job_id']}${result[i]['children'][x]['position']['job_id']}`;
      //         result[i]['children'][x]['children'] = data;
      //         for (var y = 0; y < result[i]['children'][x]['children'].length;y++) {
      //             result[i]['children'][x]['children'][y]['position'] = await JobPosition.findOne({
      //                 where: {
      //                     id: result[i]['children'][x]['children'][y]['position_id'],
      //                 }
      //             });
      //             result[i]['children'][x]['children'][y]['structure_id'] = `${result[i]['position']['job_id']}${result[i]['children'][x]['position']['job_id']}${result[i]['children'][x]['children'][y]['position']['job_id']}`;
      //             result[i]['children'][x]['children'][y]['children'] = await db.query(`SELECT * FROM organizations WHERE sequence=${result[i]['children'][x]['children'][y]['id']}`,{raw: true, nest: true});
      //             for (var o = 0;o < result[i]['children'][x]['children'][y]['children'].length;o++) {
      //                 result[i]['children'][x]['children'][y]['children'][o]['position'] = await JobPosition.findOne({
      //                     where: {
      //                         id: result[i]['children'][x]['children'][y]['children'][o]['position_id'],
      //                     }
      //                 });
      //                 result[i]['children'][x]['children'][y]['children'][o]['structure_id'] = `${result[i]['position']['job_id']}${result[i]['children'][x]['position']['job_id']}${result[i]['children'][x]['children'][y]['position']['job_id']}${result[i]['children'][x]['children'][y]['children'][o]['position']['job_id']}`;
      //                 result[i]['children'][x]['children'][y]['children'][o]['children'] = await db.query(`SELECT * FROM organizations WHERE sequence=${result[i]['children'][x]['children'][y]['children'][o]['id']}`,{raw: true, nest: true});
      //             }
      //         }
      //     }
      // }
      result = await db.query(
        `SELECT * FROM jobpositions WHERE relation_code IS NULL AND unique_id='${req.query.unique_id}'`,
        { raw: true, nest: true }
      );

      for (var a = 0; a < result.length; a++) {
        var struktur1 = result[a];
        struktur1["structure_id"] = struktur1["job_id"];
        struktur1["children"] = await db.query(
          `SELECT * FROM jobpositions WHERE relation_code=${struktur1["id"]} AND unique_id='${req.query.unique_id}'`,
          { raw: true, nest: true }
        );
        for (var b = 0; b < struktur1["children"].length; b++) {
          var struktur2 = struktur1["children"][b];
          struktur2[
            "structure_id"
          ] = `${struktur1["job_id"]}${struktur2["job_id"]}`;
          struktur2["children"] = await db.query(
            `SELECT * FROM jobpositions WHERE relation_code=${struktur2["id"]} AND unique_id='${req.query.unique_id}'`,
            { raw: true, nest: true }
          );
          for (var c = 0; c < struktur2["children"].length; c++) {
            var struktur3 = struktur2["children"][c];
            struktur3[
              "structure_id"
            ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}`;
            struktur3["children"] = await db.query(
              `SELECT * FROM jobpositions WHERE relation_code=${struktur3["id"]} AND unique_id='${req.query.unique_id}'`,
              { raw: true, nest: true }
            );
            for (var d = 0; d < struktur3["children"].length; d++) {
              var struktur4 = struktur3["children"][d];
              struktur4[
                "structure_id"
              ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}`;
              struktur4["children"] = await db.query(
                `SELECT * FROM jobpositions WHERE relation_code=${struktur4["id"]} AND unique_id='${req.query.unique_id}'`,
                { raw: true, nest: true }
              );
              for (var e = 0; e < struktur4["children"].length; e++) {
                var struktur5 = struktur4["children"][e];
                struktur5[
                  "structure_id"
                ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}`;
                struktur5["children"] = await db.query(
                  `SELECT * FROM jobpositions WHERE relation_code=${struktur5["id"]} AND unique_id='${req.query.unique_id}'`,
                  { raw: true, nest: true }
                );
                for (var f = 0; f < struktur5["children"].length; f++) {
                  var struktur6 = struktur5["children"][f];
                  struktur6[
                    "structure_id"
                  ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}`;
                  struktur6["children"] = await db.query(
                    `SELECT * FROM jobpositions WHERE relation_code=${struktur6["id"]} AND unique_id='${req.query.unique_id}'`,
                    { raw: true, nest: true }
                  );
                  for (var g = 0; g < struktur6["children"].length; g++) {
                    var struktur7 = struktur6["children"][g];
                    struktur7[
                      "structure_id"
                    ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}`;
                    struktur7["children"] = await db.query(
                      `SELECT * FROM jobpositions WHERE relation_code=${struktur7["id"]} AND unique_id='${req.query.unique_id}'`,
                      { raw: true, nest: true }
                    );
                    for (var h = 0; h < struktur7["children"].length; h++) {
                      var struktur8 = struktur7["children"][h];
                      struktur8[
                        "structure_id"
                      ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}`;
                      struktur8["children"] = await db.query(
                        `SELECT * FROM jobpositions WHERE relation_code=${struktur8["id"]} AND unique_id='${req.query.unique_id}'`,
                        { raw: true, nest: true }
                      );
                      for (var i = 0; i < struktur8["children"].length; i++) {
                        var struktur9 = struktur8["children"][i];
                        struktur9[
                          "structure_id"
                        ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}`;
                        struktur9["children"] = await db.query(
                          `SELECT * FROM jobpositions WHERE relation_code=${struktur9["id"]} AND unique_id='${req.query.unique_id}'`,
                          { raw: true, nest: true }
                        );
                        for (var j = 0; j < struktur9["children"].length; j++) {
                          var struktur10 = struktur9["children"][j];
                          struktur10[
                            "structure_id"
                          ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}${struktur10["job_id"]}`;
                          struktur10["children"] = await db.query(
                            `SELECT * FROM jobpositions WHERE relation_code=${struktur10["id"]} AND unique_id='${req.query.unique_id}'`,
                            { raw: true, nest: true }
                          );
                          for (
                            var k = 0;
                            k < struktur10["children"].length;
                            k++
                          ) {
                            var struktur11 = struktur10["children"][k];
                            struktur11[
                              "structure_id"
                            ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}${struktur10["job_id"]}${struktur11["job_id"]}`;
                            struktur11["children"] = await db.query(
                              `SELECT * FROM jobpositions WHERE relation_code=${struktur11["id"]} AND unique_id='${req.query.unique_id}'`,
                              { raw: true, nest: true }
                            );
                            for (
                              var l = 0;
                              l < struktur10["children"].length;
                              l++
                            ) {
                              var struktur12 = struktur11["children"][k];
                              struktur12[
                                "structure_id"
                              ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}${struktur10["job_id"]}${struktur11["job_id"]}${struktur12["job_id"]}`;
                              struktur12["children"] = [];
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    res.send(result);
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
      error: err.toString(),
    });
  }
};