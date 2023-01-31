const User = require("../models/User.js");
const Organization = require("../models/Organization.js");
const Companylocation = require("../models/Companylocation.js");
const { JobPosition } = require("../models/JobModels");
const db = require("../config/database");
const { Op } = require("sequelize");

module.exports.addCompanyLocation = async (req, res) => {
  try {
    const result = await Companylocation.create({
      name: req.body.name,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postalCode: req.body.postalCode,
      phone: req.body.phone,
      fax: req.body.fax,
      address: req.body.address,
      note: req.body.note,
      unique_id: req.userData.unique_id,
    });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.updateCompanyLocation = async (req, res) => {
  try {
    const result = await Companylocation.update(
      {
        name: req.body.name,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        postalCode: req.body.postalCode,
        phone: req.body.phone,
        fax: req.body.fax,
        address: req.body.address,
        note: req.body.note,
      },
      { where: { id: req.body.id } }
    );
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports.getCodeStructure = async (req, res) => {
  var result = await db.query(
    `SELECT * FROM jobpositions WHERE id=${req.query.id} AND unique_id='${req.userData.unique_id}'`,
    { raw: true, nest: true }
  );
  var kode =
    result[0]["relation_code"] != null
      ? `${result[0]["relation_code"]}${result[0]["job_id"]}`
      : result[0]["job_id"];
  res.send({ result: kode });
};

module.exports.getCompanyLocation = async (req, res) => {
  try {
    const result = await Companylocation.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
    });
    res.send({
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteCompanyLocation = async (req, res) => {
  try {
    const result = await Companylocation.destroy({
      where: { id: req.query.id },
    });
    res.send({
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addStructure = async (req, res) => {
  try {
    var position = await JobPosition.findOne({
      where: {
        id: req.body.position_id,
      },
      raw: true,
      nest: true,
    });
    if (position["relation_code"] != null) {
      var position2 = await JobPosition.findOne({
        where: {
          job_id: position["relation_code"],
        },
        raw: true,
        nest: true,
      });

      var cek = await Organization.findOne({
        where: {
          position_id: position2["id"],
        },
        raw: true,
        nest: true,
      });

      if (cek) {
        await Organization.create({
          sequence: cek["id"],
          structure_id: req.body.structure_id,
          position_id: req.body.position_id,
          color: req.body.color,
          unique_id: req.userData.unique_id,
        });
      } else {
        res.send({
          status: 400,
          message: "Parent belum ditambahkan",
        });
      }
    } else {
      await Organization.create({
        sequence: null,
        structure_id: req.body.structure_id,
        position_id: req.body.position_id,
        color: req.body.color,
        unique_id: req.userData.unique_id,
      });
    }

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.updateStructure = async (req, res) => {
  try {
    var position = await JobPosition.findOne({
      where: {
        id: req.body.position_id,
      },
      raw: true,
      nest: true,
    });
    if (position["relation_code"] != null) {
      var position2 = await JobPosition.findOne({
        where: {
          job_id: position["relation_code"],
        },
        raw: true,
        nest: true,
      });

      var cek = await Organization.findOne({
        where: {
          position_id: position2["id"],
        },
        raw: true,
        nest: true,
      });

      if (cek) {
        Organization.update(
          {
            sequence: cek["id"],
            structure_id: req.body.structure_id,
            position_id: req.body.position_id,
            color: req.body.color,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        );
      } else {
        res.send({
          status: 400,
          message: "Parent belum ditambahkan",
        });
      }
    } else {
      Organization.update(
        {
          sequence: null,
          structure_id: req.body.structure_id,
          position_id: req.body.position_id,
          color: req.body.color,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
    }
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
module.exports.getStructure = async (req, res) => {
  try {
    var result;
    if (req.query.ket) {
      result = await db.query(`SELECT * FROM organizations WHERE unique_id='${req.userData.unique_id}'`, {
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
        `SELECT * FROM jobpositions WHERE relation_code IS NULL AND unique_id='${req.userData.unique_id}'`,
        { raw: true, nest: true }
      );

      for (var a = 0; a < result.length; a++) {
        var struktur1 = result[a];
        struktur1["structure_id"] = struktur1["job_id"];
        struktur1["children"] = await db.query(
          `SELECT * FROM jobpositions WHERE relation_code=${struktur1["id"]} AND unique_id='${req.userData.unique_id}'`,
          { raw: true, nest: true }
        );
        for (var b = 0; b < struktur1["children"].length; b++) {
          var struktur2 = struktur1["children"][b];
          struktur2[
            "structure_id"
          ] = `${struktur1["job_id"]}${struktur2["job_id"]}`;
          struktur2["children"] = await db.query(
            `SELECT * FROM jobpositions WHERE relation_code=${struktur2["id"]} AND unique_id='${req.userData.unique_id}'`,
            { raw: true, nest: true }
          );
          for (var c = 0; c < struktur2["children"].length; c++) {
            var struktur3 = struktur2["children"][c];
            struktur3[
              "structure_id"
            ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}`;
            struktur3["children"] = await db.query(
              `SELECT * FROM jobpositions WHERE relation_code=${struktur3["id"]} AND unique_id='${req.userData.unique_id}'`,
              { raw: true, nest: true }
            );
            for (var d = 0; d < struktur3["children"].length; d++) {
              var struktur4 = struktur3["children"][d];
              struktur4[
                "structure_id"
              ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}`;
              struktur4["children"] = await db.query(
                `SELECT * FROM jobpositions WHERE relation_code=${struktur4["id"]} AND unique_id='${req.userData.unique_id}'`,
                { raw: true, nest: true }
              );
              for (var e = 0; e < struktur4["children"].length; e++) {
                var struktur5 = struktur4["children"][e];
                struktur5[
                  "structure_id"
                ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}`;
                struktur5["children"] = await db.query(
                  `SELECT * FROM jobpositions WHERE relation_code=${struktur5["id"]} AND unique_id='${req.userData.unique_id}'`,
                  { raw: true, nest: true }
                );
                for (var f = 0; f < struktur5["children"].length; f++) {
                  var struktur6 = struktur5["children"][f];
                  struktur6[
                    "structure_id"
                  ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}`;
                  struktur6["children"] = await db.query(
                    `SELECT * FROM jobpositions WHERE relation_code=${struktur6["id"]} AND unique_id='${req.userData.unique_id}'`,
                    { raw: true, nest: true }
                  );
                  for (var g = 0; g < struktur6["children"].length; g++) {
                    var struktur7 = struktur6["children"][g];
                    struktur7[
                      "structure_id"
                    ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}`;
                    struktur7["children"] = await db.query(
                      `SELECT * FROM jobpositions WHERE relation_code=${struktur7["id"]} AND unique_id='${req.userData.unique_id}'`,
                      { raw: true, nest: true }
                    );
                    for (var h = 0; h < struktur7["children"].length; h++) {
                      var struktur8 = struktur7["children"][h];
                      struktur8[
                        "structure_id"
                      ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}`;
                      struktur8["children"] = await db.query(
                        `SELECT * FROM jobpositions WHERE relation_code=${struktur8["id"]} AND unique_id='${req.userData.unique_id}'`,
                        { raw: true, nest: true }
                      );
                      for (var i = 0; i < struktur8["children"].length; i++) {
                        var struktur9 = struktur8["children"][i];
                        struktur9[
                          "structure_id"
                        ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}`;
                        struktur9["children"] = await db.query(
                          `SELECT * FROM jobpositions WHERE relation_code=${struktur9["id"]} AND unique_id='${req.userData.unique_id}'`,
                          { raw: true, nest: true }
                        );
                        for (var j = 0; j < struktur9["children"].length; j++) {
                          var struktur10 = struktur9["children"][j];
                          struktur10[
                            "structure_id"
                          ] = `${struktur1["job_id"]}${struktur2["job_id"]}${struktur3["job_id"]}${struktur4["job_id"]}${struktur5["job_id"]}${struktur6["job_id"]}${struktur7["job_id"]}${struktur8["job_id"]}${struktur9["job_id"]}${struktur10["job_id"]}`;
                          struktur10["children"] = await db.query(
                            `SELECT * FROM jobpositions WHERE relation_code=${struktur10["id"]} AND unique_id='${req.userData.unique_id}'`,
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
                              `SELECT * FROM jobpositions WHERE relation_code=${struktur11["id"]} AND unique_id='${req.userData.unique_id}'`,
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
      error: err,
    });
  }
};
module.exports.deleteStructure = async (req, res) => {
  try {
    const result = Organization.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "Success delete structure",
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
