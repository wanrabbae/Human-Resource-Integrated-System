const Recruitment = require("../models/Recruitment.js");
const Employee = require("../models/Employee.js");
const Applicant = require("../models/Applicant.js");
const Stage = require("../models/Stage.js");
const Nationality = require("../models/Nationality.js");
const Workexperience = require("../models/Workexperience.js");
const Notification = require("../models/Notification.js");
const { sendEmail } = require("../config/nodemailer");
const { Op } = require("sequelize");
const db = require("../config/database");
const SpesificRecruitment = require("../models/SpesificRecruitment.js");
const { default: axios } = require("axios");

module.exports.addRecruitment = async (req, res) => {
  try {
    const check = await Recruitment.findOne({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
        title: req.body.title,
      },
    });

    if (check) {
      return res.status(400).json({
        status: 400,
        message: "*Recruitment title already in use!",
      });
    }

    const result = await Recruitment.create({
      title: req.body.title,
      description: req.body.description,
      position: req.body.position,
      placement: req.body.placement,
      jobDescription: req.body.jobDescription,
      qualification: req.body.qualification,
      location: req.body.placement,
      type: req.body.type,
      publishDate: req.body.publishDate,
      expiredDate: req.body.expiredDate,
      unique_id: req.userData.unique_id,
    });
    let spesificQua = {};
    if (
      req.body.spesificQualification ||
      req.body.spesificQualification.length > 0
    ) {
      spesificQua = {
        recruitment_id: result.id,
        ageRange: req.body.spesificQualification.ageRange,
        gender: req.body.spesificQualification.gender,
        education: req.body.spesificQualification.education,
        experience: req.body.spesificQualification.experience,
        skill: req.body.spesificQualification.skill,
        priority: req.body.spesificQualification.priority,
      }
      const saveToSpesific = await SpesificRecruitment.create({
        recruitment_id: result.id,
        ageRange: req.body.spesificQualification.ageRange,
        gender: req.body.spesificQualification.gender,
        education: req.body.spesificQualification.education,
        experience: req.body.spesificQualification.experience,
        skill: req.body.spesificQualification.skill,
        priority: req.body.spesificQualification.priority,
      });
    }

    await axios.post(`${process.env.ETHOS_URL}/addRecruitment`, {
      unique_id: result.id,
      title: req.body.title,
      description: req.body.description,
      position: req.body.position,
      placement: req.body.placement,
      type: req.body.type,
      jobDescription: req.body.jobDescription,
      qualification: req.body.qualification,
      publishDate: req.body.publishDate,
      expiredDate: req.body.expiredDate,
      spesificQualification: spesificQua,
    })

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      errors: err.toString()
    });
    console.log(err);
  }
};
module.exports.updateRecruitment = async (req, res) => {
  try {
    const result = await Recruitment.update(
      {
        title: req.body.title,
        description: req.body.description,
        position: req.body.position,
        placement: req.body.placement,
        jobDescription: req.body.jobDescription,
        qualification: req.body.qualification,
        location: req.body.location,
        type: req.body.type,
      },
      {
        where: { id: req.body.id },
      }
    );

    const saveToSpesific = await SpesificRecruitment.update(
      {
        ageRange: req.body.spesificQualification.ageRange,
        gender: req.body.spesificQualification.gender,
        education: req.body.spesificQualification.education,
        experience: req.body.spesificQualification.experience,
        skill: req.body.spesificQualification.skill,
        priority: req.body.spesificQualification.priority,
      },
      {
        where: { recruitment_id: req.body.id },
      }
    );

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      status: 500,
      message: err,
    });
    console.log(err);
  }
};
module.exports.repostRecruitment = async (req, res) => {
  try {
    const result = await Recruitment.update(
      {
        publishDate: req.body.publishDate,
        expiredDate: req.body.expiredDate,
      },
      {
        where: { id: req.body.id },
      }
    );
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.send({
      status: 500,
      message: err,
    });
  }
};
module.exports.getRecruitment = async (req, res) => {
  try {
    var result;
    if (req.query.keyword) {
      result = await Recruitment.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${req.query.keyword}%`,
              },
            },
            {
              placement: {
                [Op.like]: `%${req.query.keyword}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${req.query.keyword}%`,
              },
            },
            {
              position: {
                [Op.like]: `%${req.query.keyword}%`,
              },
            },
            {
              unique_id: req.userData.unique_id,
            },
            {

            },
          ],
        },
        include: SpesificRecruitment,
        raw: true,
        nest: true,
      });
    } else {
      result = await Recruitment.findAll({
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
        include: SpesificRecruitment,
        raw: true,
        nest: true,
      });
    }

    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports.getRecruitmentFilter = (req, res) => {
  res.send("TEST REC FILTER");
};

module.exports.getRecruitmentById = async (req, res) => {
  try {
    const result = await Recruitment.findOne({
      where: { id: req.query.id },
      include: SpesificRecruitment,
    });

    // if (result.spesificrecruitment) {
    //     result.spesificrecruitment.map(sr => {
    //         sr.education = JSON.parse(sr.education)
    //     })
    // }

    res.json({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteRecruitment = async (req, res) => {
  try {
    await Recruitment.destroy({ where: { id: req.query.id } });
    await Applicant.destroy({ where: { recruitment_id: req.query.id } });
    res.send({
      status: 200,
      message: "Success",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getStage = async (req, res) => {
  try {
    var data;
    if (req.query.applicant_id) {
      data = await db.query(
        `SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.id = "${req.query.applicant_id}"`,
        { raw: true, nest: true }
      );
      //   data = await Stage.findAll({
      //     where: {
      //       applicant_id: req.query.applicant_id,
      //     },
      //     include: { model: Applicant, include: Recruitment },
      //   });
    } else if (req.query.keyword) {
      data = await db.query(
        `SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.name LIKE '%${req.query.keyword}%' OR recruitments.position LIKE '%${req.query.keyword}%' OR applicants.phone LIKE '%${req.query.keyword}%' OR stages.stage LIKE '%${req.query.keyword}%'`,
        { raw: true, nest: true }
      );
      //     data = await Stage.findAll({
      //     where: {
      //       [Op.or]: [
      //           {
      //               name: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //             },
      //          }
      //         ]
      //     },
      //     include: {
      //         model: Applicant,
      //         // where: {
      //         //   [Op.or]: [
      //         //         {
      //         //             name: {
      //         //                 [Op.like]: `%${req.query.keyword}%`,
      //         //             }
      //         //         }
      //         //       ]
      //         // },
      //         include: {
      //             model: Recruitment,
      //             // where: {
      //             //     [Op.or]: [
      //             //             {
      //             //                 position: {
      //             //         [Op.like]: `%${req.query.keyword}%`,
      //             //     },
      //             //             }
      //             //         ]
      //             // },
      //         } ,

      //     },
      //   });
    } else if (req.query.date) {
      data = await db.query(
        `SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.date = '${req.query.date}'`,
        { raw: true, nest: true }
      );
      //   data = await Stage.findAll({
      //     include: {
      //     model: Applicant,
      //     where: {
      //       date: {
      //           [Op.eq]: new Date(req.query.date),
      //       }
      //     },
      //     include: Recruitment
      //     },
      //   });
    } else {
      data = await db.query(
        `SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id`,
        { raw: true, nest: true }
      );
      // let data2 = await db.query(`SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id`, {raw: true, nest: true});

      // for (var i = 0; i < data2.length; i++) {
      //     data = await db.query(`SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE stages.applicant_id = ${data2.applicant_id} ORDER BY created_at DESC LIMIT 1`, {raw: true, nest: true})
      // }
      //   data = await Stage.findAll({
      //     include: { model: Applicant, include: Recruitment },
      //   });
    }

    for (var i = 0; i < data.length; i++) {
      data[i]["status"] =
        data[i]["status"] == "1"
          ? "On Process"
          : data[i]["status"] == "0"
            ? "Failed"
            : "Success";
    }

    res.send({
      message: "success",
      result: data,
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e,
    });
  }
};

module.exports.getStageRange = async (req, res) => {
  try {
    // const startDate = new Date(req.query.startDate);
    // const endDate = new Date(req.query.endDate);
    // const date2 = new Date(endDate.setDate(endDate.getDate() + 1));
    // const stages = await Stage.findAll({
    //   where: {
    //     created_at: {
    //       [Op.between]: [startDate, date2],
    //     },
    //   },
    //   include: { model: Applicant, include: Recruitment },
    // });

    const stages = await db.query(
      `SELECT * FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE (stages.created_at BETWEEN "${req.query.startDate}" AND "${req.query.endDate}")`,
      { raw: true, nest: true }
    );

    return res.status(200).json({
      status: 200,
      result: stages,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

module.exports.getStageFilter = async (req, res) => {
  //   let query = `SELECT stages.id AS stage_id, applicant_id, stage, note, stages.status, stages.created_at, stages.updated_at, recruitments.position, applicants.date, applicants.phone, applicants.name FROM stages INNER JOIN applicants ON stages.applicant_id = applicants.id INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE recruitments.position IN("full-stack", "Technical Architect Head") AND stages.stage IN("Interview", "psikotes", "tes jasmani")`
  try {
    const data = req.body;
    let stage;

    //   if (data.position && data.recruitment_stage) {
    //       stage = await Stage.findAll({
    //                 where: {
    //                   stage: {
    //                     [Op.or]: data.recruitment_stage,
    //                   },
    //                 },
    //                 include: {
    //                   model: Applicant,
    //                   include: {
    //                     model: Recruitment,
    //                     where: {
    //                       position: {
    //                         [Op.or]: data.position,
    //                       },
    //                     },
    //                   },
    //                 },
    //                 raw: true,
    //                 nest: true,
    //               });
    //   }else if (data.position) {
    //       stage = await Stage.findAll({
    //                 include: {
    //                   model: Applicant,
    //                   include: {
    //                     model: Recruitment,
    //                     where: {
    //                       position: {
    //                         [Op.or]: data.position,
    //                       },
    //                     },
    //                   },
    //                 },
    //                 raw: true,
    //                 nest: true,
    //               });
    //   }else if (data.recruitment_stage) {
    //       stage = await Stage.findAll({
    //             where: {
    //               stage: {
    //                 [Op.or]: data.recruitment_stage,
    //               },
    //             },
    //             include: {
    //               model: Applicant,
    //               include: {
    //                 model: Recruitment,
    //               },
    //             },
    //             raw: true,
    //             nest: true,
    //           });
    //   }else {
    //       stage = [];
    //   }

    stage = await Stage.findAll({
      where: {
        stage: {
          [Op.in]: data.recruitment_stage,
        },
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {

          },
        ],
      },
      include: {
        model: Applicant,
        include: {
          model: Recruitment,
        },
      },
      raw: true,
      nest: true,
    });
    var response = [];
    for (var i = 0; i < stage.length; i++) {
      stage[i]["status"] =
        stage[i]["status"] == "1"
          ? "On Process"
          : stage[i]["status"] == "0"
            ? "Failed"
            : "Success";
      for (var a = 0; a < data.position.length; a++) {
        if (
          data.position[a] == stage[i]["applicant"]["recruitment"]["position"]
        ) {
          response.push(stage[i]);
        }
      }
    }
    return res.status(200).json({ message: "success", result: response });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: error,
    });
  }
};

module.exports.addStage = async (req, res) => {
  try {
    var data = await Stage.create({
      applicant_id: req.body.applicant_id,
      stage: req.body.stage,
      note: req.body.note,
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

module.exports.updateStatusStage = async (req, res) => {
  try {
    var data = await Stage.update(
      {
        status: req.body.status,
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
      message: "error",
      error: e.toString(),
    });
  }
};

module.exports.sendEmailStage = async (req, res) => {
  const send = await sendEmail({
    to: req.body.email,
    subject: "Reply From Ethos",
    message: "Selamat anda telah memasuki stage berikutnya",
  });

  res.send({
    status: 200,
    message: "success",
  });
};

module.exports.updateStatusApplicant = async (req, res) => {
  try {
    var findData = await Applicant.findOne({
      where: { id: req.body.id },
      raw: true,
      nest: true,
      attributes: ["id", "date", "email"],
    });

    var data = await Applicant.update(
      {
        status: req.body.status,
        archive: req.body.status == 0 ? 1 : 0,
        date: req.body.status == 0 ? new Date() : findData.date,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );

    if (req.body.status == "2") {
      var applicant = await Applicant.findOne({
        where: {
          id: req.body.id,
        },
      });

      // const send = await sendEmail({
      //   to: findData.email,
      //   subject: "Reply From Ethos",
      //   message: "Selamat anda telah lolos",
      // });

      var nationalities = await Nationality.findOne({
        where: {
          name: {
            [Op.like]: `%${applicant.citizen}%`,
          },
        },
      });

      var employee = await Employee.create({
        image: "default.jpg",
        firstName: applicant.name,
        maritalStatus: applicant.marital,
        birthDate: applicant.birthDate,
        gender: applicant.gender,
        street: applicant.address,
        nationality_id: nationalities != null ? nationalities.id : null,
        country: applicant.citizen,
        phone: applicant.phone,
        mobilePhone: applicant.phone,
        email: applicant.email,
        npwp: applicant.npwp,
        religion: applicant.religion,
        unique_id: req.userData.unique_id,
      });

      var experiences = JSON.parse(applicant.experience != null || applicant.experience != undefined || applicant.experience != "" ? applicant.experience : "[]");

      if (experiences.length > 0) {
        for (var i = 0; i < experiences.length; i++) {
          await Workexperience.create({
            employeeId: employee.id,
            companyName: experiences[i]["perusahaan"],
            jobTitle: experiences[i]["position"],
            startDate: experiences[i]["mulai"],
            endDate: experiences[i]["berakhir"],
            comment: `${experiences[i]["jenis"]}, ${experiences[i]["desc"]}`,
          });
        }
      }
    }

    if (req.body.status == "0") {
      await Stage.destroy({
        where: {
          applicant_id: req.body.id
        }
      })
      const send = await sendEmail({
        to: findData.email,
        subject: "Reply From Ethos",
        message: "Mohon maaf anda belum lolos",
      });
    }

    res.send({
      message: "success",
    });
  } catch (e) {
    res.send({
      message: "error",
      error: e.toString(),
    });
  }
};

module.exports.getNotif = async (req, res) => {
  try {
    var data;

    if (req.userData.role_id < 4 && req.userData.role_id > 1) {
      data = await Notification.findAll({
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
        include: {
          model: Applicant,
          attributes: ["id", "name"],
        },
        raw: true,
        nest: true,
      });
    } else {
      data = await Notification.findAll({
        order: [["id", "DESC"]],
        where: {
          employeeId: req.userData.employee.id,
        },
        include: {
          model: Applicant,
          attributes: ["id", "name"],
        },
        raw: true,
        nest: true,
      });
    }

    res.status(200).json({
      status: 200,
      result: data,
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "error",
    });
  }
};
