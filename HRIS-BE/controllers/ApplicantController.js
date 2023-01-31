const User = require("../models/User.js");
const Applicant = require("../models/Applicant.js");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const Recruitment = require("../models/Recruitment.js");
const Notification = require("../models/Notification.js");
const SpesificRecruitment = require("../models/SpesificRecruitment.js");
const { sendEmail } = require("../config/nodemailer");
const db = require("../config/database")
module.exports.addApplicant = async (req, res) => {
  try {
    var applicantFileName;
    var ktpFileName;
    var portfolioName;
    var vaccinceName;
    var kartuKeluarga;
    var ijazah;
    var transkripNilai;
    var status = "1";
    var archive = 0;

    if (req.files.applicantFile) {
      const tempPath = req.files.applicantFile[0].path;
      applicantFileName =
        req.files.applicantFile[0].filename +
        "." +
        req.files.applicantFile[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/applicantFile/${applicantFileName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.ktp) {
      const tempPath = req.files.ktp[0].path;
      ktpFileName =
        req.files.ktp[0].filename +
        "." +
        req.files.ktp[0].mimetype.split("/")[1];
      const targetPath = path.join(
        `assets/ktp/${ktpFileName}`
      );
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.portfolio) {
      const tempPath = req.files.portfolio[0].path;
      portfolioName =
        req.files.portfolio[0].filename +
        "." +
        req.files.portfolio[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/portfolio/${portfolioName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.vaccince) {
      const tempPath = req.files.vaccince[0].path;
      vaccinceName =
        req.files.vaccince[0].filename +
        "." +
        req.files.vaccince[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/vaccince/${vaccinceName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.kartuKeluarga) {
      const tempPath = req.files.kartuKeluarga[0].path;
      kartuKeluarga =
        req.files.kartuKeluarga[0].filename +
        "." +
        req.files.kartuKeluarga[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/kartuKeluarga/${kartuKeluarga}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.ijazah) {
      const tempPath = req.files.ijazah[0].path;
      ijazah =
        req.files.ijazah[0].filename +
        "." +
        req.files.ijazah[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/ijazah/${ijazah}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (req.files.transkripNilai) {
      const tempPath = req.files.transkripNilai[0].path;
      transkripNilai =
        req.files.transkripNilai[0].filename +
        "." +
        req.files.transkripNilai[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/transkripNilai/${transkripNilai}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    // ============== VALIDASI DISINI =========================
    const getRecruitment = await SpesificRecruitment.findOne({
      where: { recruitment_id: parseInt(req.body.recruitment_id) },
      raw: true,
      nest: true,
    });

    let priority = JSON.parse(getRecruitment.priority);


    if (getRecruitment !== null) {
      // CHECK PRIORITY
      // if(getRecruitment.priority || getRecruitment.priority != null || getRecruitment.priority != "") {
      //     priority = JSON.parse(getRecruitment.priority);
      // }

      if (priority.includes("age")) {
        // AGE VALIDATION
        const age1 = parseInt(getRecruitment.ageRange.split("-")[0]);
        const age2 = parseInt(getRecruitment.ageRange.split("-")[1]);
        const ageApplicant =
          new Date().getFullYear() - new Date(req.body.birthDate).getFullYear();
        const ageApplicant2 = parseInt(req.body.age);

        if (ageApplicant < age1 || ageApplicant2 < age1) { status = "0"; archive = 1 }
        if (ageApplicant > age2 || ageApplicant2 > age2) { status = "0"; archive = 1 }

      }

      if (priority.includes("gender")) {
        // GENDER VALIDATION
        const genderApplicant = req.body.gender;
        if (getRecruitment.gender !== genderApplicant) { status = "0"; archive = 1 };
        if (getRecruitment.gender == "unknown") { status = "1"; archive = 0 };

      }

      if (priority.includes("experience")) {
        // EXPERIENCE VALIDATION
        const getExperienceYear = parseInt(getRecruitment.experience);
        const getExperienceApplicant = JSON.parse(req.body.experience);
        const mulai = new Date(getExperienceApplicant.mulai).getFullYear();
        const berakhir = new Date(getExperienceApplicant.berakhir).getFullYear();
        const resultExpe = Math.abs(mulai - berakhir);

        if (resultExpe < getExperienceYear) { status = "0"; archive = 1 };
      }

      // EDUCATION VALIDATION
      // .......
    }

    const findRec = await Recruitment.findOne({
      id: req.body.recruitment_id,
    })

    const applicant = await Applicant.create({
      recruitment_id: req.body.recruitment_id,
      source: req.body.source,
      name: req.body.name,
      npwp: req.body.npwp,
      gender: req.body.gender,
      phone: req.body.phone,
      identityAddress: req.body.identityAddress,
      identityNumber: req.body.identityNumber,
      citizen: req.body.citizen,
      age: req.body.age,
      last_salary: req.body.last_salary,
      expected_salary: req.body.expected_salary,
      address: req.body.address,
      email: req.body.email,
      marital: req.body.marital,
      religion: req.body.religion,
      birthDate: req.body.birthDate,
      experience: req.body.experience,
      educations: req.body.education,
      applicantFile: applicantFileName,
      ktp: ktpFileName,
      portfolio: portfolioName,
      ijazah: ijazah,
      transkripNilai: transkripNilai,
      vaccince: vaccinceName,
      kartuKeluarga: kartuKeluarga,
      status: status,
      archive: archive,
      unique_id: findRec ? findRec.unique_id : null,
    });

    if (status == "0" && archive == 1) {
      const send = await sendEmail({
        to: req.body.email,
        subject: "Reply From Ethos",
        message: "Mohon maaf untuk lamaran anda kami tolak karena belum memenuhi syarat",
      });
    }

    const notif = await Notification.create({
      title: `${req.body.name} has added a new approval submission`,
      employeeId: 2,
      applicant_id: applicant.id
    })

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.send({
      error: err.toString()
    });
  }
};
module.exports.getApplicantByRecruitment = async (req, res) => {
  try {
    const result = await Applicant.findAll({
      where: { recruitment_id: req.body.recruitment_id },
    });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};
module.exports.getApplicant = async (req, res) => {
  try {
    var result;
    if (req.query.keyword) {
      result = await db.query(`SELECT applicants.id AS applicant_id, recruitment_id, source, date, name, gender, npwp, religion, phone, identityNumber, identityAddress, address, email, birthDate, citizen, age, marital, educations, experience, applicantFile, ktp, portfolio, vaccince, kartuKeluarga, ijazah, transkripNilai, last_salary, expected_salary, status, archive, createdAt, updatedAt, recruitments.id, recruitments.position FROM (SELECT * FROM applicants WHERE applicants.archive = "0") applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE recruitments.position LIKE '%${req.query.keyword}%' OR applicants.source LIKE '%${req.query.keyword}%' OR applicants.name LIKE '%${req.query.keyword}%' OR applicants.phone LIKE '%${req.query.keyword}%' AND applicants.unique_id = ${req.userData.unique_id} OR applicants.unique_id LIKE '${req.userData.unique_id}%' OR applicants.unique_id = null`, { raw: true, nest: true });
      //   result = await Applicant.findAll({
      //   where: {
      //       [Op.or]: [
      //         {
      //             archive: 0      
      //         },
      //         {
      //           name: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //           },
      //         },
      //         {
      //           source: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //           },
      //         },
      //       ],
      //     },
      //     include: [{ 
      //         model: Recruitment, 
      //         attributes: ["id", "position"],
      //         where: {
      //             [Op.or]: [
      //                     {
      //                         position: {
      //         [Op.like]: `%${req.query.keyword}%`,
      //         }
      //                     }
      //                 ]

      //         } 

      //     }],

      //   });
    } else if (req.query.applicant_id) {
      result = await db.query(`SELECT applicants.id AS applicant_id, recruitment_id, source, date, name, gender, npwp, religion, phone, identityNumber, identityAddress, address, email, birthDate, citizen, age, marital, educations, experience, applicantFile, ktp, portfolio, vaccince, kartuKeluarga, ijazah, transkripNilai, last_salary, expected_salary, status, archive, createdAt, updatedAt, recruitments.id, recruitments.position FROM applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.id = ${req.query.applicant_id}`, { raw: true, nest: true });
    } else {
      result = await db.query(`SELECT applicants.id AS applicant_id, recruitment_id, source, date, name, gender, npwp, religion, phone, identityNumber, identityAddress, address, email, birthDate, citizen, age, marital, educations, experience, applicantFile, ktp, portfolio, vaccince, kartuKeluarga, ijazah, transkripNilai, last_salary, expected_salary, status, archive, createdAt, updatedAt, recruitments.id, recruitments.position FROM applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.archive = 0 AND applicants.unique_id = '${req.userData.unique_id}' OR applicants.unique_id LIKE '${req.userData.unique_id}%' OR applicants.unique_id = null ORDER BY applicants.id DESC`, { raw: true, nest: true });
      //   result = await Applicant.findAll({
      //     where: {archive: 0},
      //     include: [{ model: Recruitment, attributes: ["id", "position"] }],
      //   });
    }

    for (var i = 0; i < result.length; i++) {
      result[i]["educations"] = result[i]["educations"] != null || result[i]["educations"] != '' ? JSON.parse(result[i]["educations"]) : null;
      result[i]["experience"] = result[i]["experience"] != null || result[i]["experience"] != '' ? JSON.parse(result[i]["experience"]) : null;
      result[i]["skck"] =
        result[i]["skck"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/skck/${result[i]["skck"]}`
          : null;
      result[i]["ijazah"] =
        result[i]["ijazah"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ijazah/${result[i]["ijazah"]}`
          : null;
      result[i]["applicantFile"] =
        result[i]["applicantFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/applicantFile/${result[i]["applicantFile"]}`
          : null;
      result[i]["experienceFile"] =
        result[i]["experienceFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/experienceFile/${result[i]["experienceFile"]}`
          : null;
      result[i]["portfolio"] =
        result[i]["portfolio"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/portfolio/${result[i]["portfolio"]}`
          : null;
      result[i]["vaccince"] =
        result[i]["vaccince"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/vaccince/${result[i]["vaccince"]}`
          : null;
      result[i]["ktp"] =
        result[i]["ktp"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ktp/${result[i]["ktp"]}`
          : null;
      result[i]["kartuKeluarga"] =
        result[i]["kartuKeluarga"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/kartuKeluarga/${result[i]["kartuKeluarga"]}`
          : null;
      result[i]["transkripNilai"] =
        result[i]["transkripNilai"] != null
          ? `https://hris.afkaaruna.sch.id/assets/transkripNilai/${result[i]["transkripNilai"]}`
          : null;
    }

    res.send(result);
  } catch (err) {
    res.send({
      error: err.toString(),
    });
    console.log(err);
  }
};
module.exports.getApplicantArchive = async (req, res) => {
  try {
    var result;
    if (req.query.keyword) {
      result = await db.query(`SELECT * FROM (SELECT * FROM applicants WHERE applicants.archive = 1) applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE recruitments.position LIKE '%${req.query.keyword}%' OR applicants.source LIKE '%${req.query.keyword}%' OR applicants.name LIKE '%${req.query.keyword}%' AND applicants.unique_id = '${req.userData.unique_id}' OR applicants.unique_id LIKE '${req.userData.unique_id}%' OR applicants.unique_id = null`, { raw: true, nest: true });
      //   result = await Applicant.findAll({
      //     include: [{ model: Recruitment, attributes: ["id", "position"], where: {position: {
      //         [Op.like]: `%${req.query.keyword}%`,
      //     }} }],
      //     where: {
      //       [Op.or]: [
      //         {
      //             archive: 1      
      //         },
      //         {
      //           name: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //           },
      //         },
      //         {
      //           source: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //           },
      //         },
      //         {
      //           phone: {
      //             [Op.like]: `%${req.query.keyword}%`,
      //           },
      //         },
      //       ],
      //     },

      //   });
    } else {
      result = await db.query(`SELECT * FROM applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.archive = 1 AND applicants.unique_id = '${req.userData.unique_id}' OR applicants.unique_id LIKE '${req.userData.unique_id}%' OR applicants.unique_id = null`, { raw: true, nest: true });
      //   result = await Applicant.findAll({
      //     where: {archive: 1},
      //     include: [{ model: Recruitment, attributes: ["id", "position"] }],
      //   });
    }

    for (var i = 0; i < result.length; i++) {
      result[i]["educations"] = JSON.parse(result[i]["educations"]);
      result[i]["experience"] = JSON.parse(result[i]["experience"]);
      result[i]["skck"] =
        result[i]["skck"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/skck/${result[i]["skck"]}`
          : null;
      result[i]["ijazah"] =
        result[i]["ijazah"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ijazah/${result[i]["ijazah"]}`
          : null;
      result[i]["applicantFile"] =
        result[i]["applicantFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/applicantFile/${result[i]["applicantFile"]}`
          : null;
      result[i]["experienceFile"] =
        result[i]["experienceFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/experienceFile/${result[i]["experienceFile"]}`
          : null;
      result[i]["portfolio"] =
        result[i]["portfolio"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/portfolio/${result[i]["portfolio"]}`
          : null;
      result[i]["vaccince"] =
        result[i]["vaccince"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/vaccince/${result[i]["vaccince"]}`
          : null;
      result[i]["ktp"] =
        result[i]["ktp"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ktp/${result[i]["ktp"]}`
          : null;
      result[i]["kartuKeluarga"] =
        result[i]["kartuKeluarga"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/kartuKeluarga/${result[i]["kartuKeluarga"]}`
          : null;
      result[i]["transkripNilai"] =
        result[i]["transkripNilai"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/transkripNilai/${result[i]["transkripNilai"]}`
          : null;
    }

    res.send(result);
  } catch (err) {
    res.send({
      error: err,
    });
    console.log(err);
  }
}
module.exports.getApplicantFilter = async (req, res) => {
  try {
    var rec = [];
    let age1 = parseInt(req.body.age.split("-")[0]);
    let age2 = parseInt(req.body.age.split("-")[1]);
    let gender = JSON.parse(req.body.gender);
    let source = JSON.parse(req.body.source);
    let studi = JSON.parse(req.body.studi);

    if (req.body.position) {
      var position = JSON.parse(req.body.position);
      if (req.body.date) {
        rec = await Applicant.findAll({
          include: {
            model: Recruitment,
            where: {
              position: {
                [Op.in]: position,
              },
            },
          },
          where: {
            source: {
              [Op.in]: source,
            },
            archive: 0,
            gender: {
              [Op.in]: gender,
            },
            date: Date.parse(req.body.date),
            [Op.or]: [
              {
                age: {
                  [Op.lte]: age2,
                  [Op.gte]: age1,
                },
              },
            ],
          }
        });
      } else {
        rec = await Applicant.findAll({
          include: {
            model: Recruitment,
            where: {
              position: {
                [Op.in]: position,
              },
            },
          },
          where: {
            archive: 0,
            source: {
              [Op.in]: source,
            },
            gender: {
              [Op.in]: gender,
            },
            [Op.or]: [
              {
                age: {
                  [Op.lte]: age2,
                  [Op.gte]: age1,
                },
              },
            ]
          }
        });
      }
    } else {
      if (req.body.date) {
        rec = await Applicant.findAll({
          include: {
            model: Recruitment,
          },
          where: {
            archive: 0,
            source: {
              [Op.in]: source,
            },
            gender: {
              [Op.in]: gender,
            },
            date: Date.parse(req.body.date),
            [Op.or]: [
              {
                age: {
                  [Op.lte]: age2,
                  [Op.gte]: age1,
                },
              },
            ],
          }
        },);
      } else {
        rec = await Applicant.findAll({
          include: {
            model: Recruitment,
          },
          where: {
            archive: 0,
            source: {
              [Op.in]: source,
            },
            gender: {
              [Op.in]: gender,
            },
            [Op.or]: [
              {
                age: {
                  [Op.lte]: age2,
                  [Op.gte]: age1,
                },
              },
            ]
          }
        },);
      }
    }
    // if(req.body.date) {
    //     rec = await Applicant.findAll({
    //               include: {
    //                 model: Recruitment,
    //                 where: {
    //                   position: {
    //                     [Op.in]: req.body.position,
    //                   },
    //                 },
    //               },
    //               where: {
    //                 archive: 0,  
    //                 source: {
    //                   [Op.in]: req.body.source,
    //                 },
    //                 date: {
    //                   [Op.eq]: new Date(req.body.date),
    //                 },
    //                 gender: {
    //                   [Op.in]: req.body.gender,
    //                 },
    //                 age: {
    //                   [Op.lte]: age2,
    //                   [Op.gte]: age1,
    //                 },
    //              },
    //         });
    // }else {
    //     rec = await Applicant.findAll({
    //               include: {
    //                 model: Recruitment,
    //                 where: {
    //                   position: {
    //                     [Op.in]: req.body.position,
    //                   },
    //                 },
    //               },
    //               where: {
    //                 archive: 0,  
    //                 source: {
    //                   [Op.in]: req.body.source,
    //                 },
    //                 gender: {
    //                   [Op.in]: req.body.gender,
    //                 },
    //                 age: {
    //                   [Op.lte]: age2,
    //                   [Op.gte]: age1,
    //                 },
    //             },
    //         });
    // }
    var data = [];
    for (var i = 0; i < rec.length; i++) {
      rec[i]["educations"] = JSON.parse(rec[i]["educations"]);
      rec[i]["experience"] = JSON.parse(rec[i]["experience"]);
      rec[i]["skck"] =
        rec[i]["skck"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/skck/${rec[i]["skck"]}`
          : null;
      rec[i]["ijazah"] =
        rec[i]["ijazah"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ijazah/${rec[i]["ijazah"]}`
          : null;
      rec[i]["applicantFile"] =
        rec[i]["applicantFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/applicantFile/${rec[i]["applicantFile"]}`
          : null;
      rec[i]["experienceFile"] =
        rec[i]["experienceFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/experienceFile/${rec[i]["experienceFile"]}`
          : null;
      rec[i]["portfolio"] =
        rec[i]["portfolio"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/portfolio/${rec[i]["portfolio"]}`
          : null;
      rec[i]["vaccince"] =
        rec[i]["vaccince"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/vaccince/${rec[i]["vaccince"]}`
          : null;
      for (var a = 0; a < rec[i]["educations"].length; a++) {
        for (var x = 0; x < studi.length; x++) {
          if (rec[i]["educations"][a]["edu"] == studi[x]) {
            data.push(rec[i]);
          }
        }
      }
    }
    var respon = [];
    for (var i = 0; i < data.length; i++) {
      if (req.body.experience) {
        for (var a = 0; a < data[i]['experience'].length; a++) {
          if (req.body.experience.toLowerCase() == data[i]['experience'][a]['position'].toLowerCase()) {
            respon.push(data[i]);
          }
        }
      } else {
        respon.push(data[i]);
      }
    }

    return res.status(200).json({
      status: 200,
      result: respon,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: `Internal server error => ${error}`,
    });
  }
};

module.exports.getApplicantByDate = async (req, res) => {
  try {
    // const rec = await Applicant.findAll({
    //     where: {
    //         archive: 0,
    //         date: {
    //             [Op.eq]: new Date(req.body.date),
    //         },
    //     },
    //     include: { model: Recruitment, attributes: ["id", "position"] },
    // });

    const rec = await db.query(`SELECT * FROM applicants INNER JOIN recruitments ON applicants.recruitment_id = recruitments.id WHERE applicants.archive = 0 AND applicants.date = "${req.body.date}"`, { raw: true, nest: true });

    for (var i = 0; i < rec.length; i++) {
      rec[i]["educations"] = JSON.parse(rec[i]["educations"]);
      rec[i]["experience"] = JSON.parse(rec[i]["experience"]);
      rec[i]["skck"] =
        rec[i]["skck"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/skck/${rec[i]["skck"]}`
          : null;
      rec[i]["ijazah"] =
        rec[i]["ijazah"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/ijazah/${rec[i]["ijazah"]}`
          : null;
      rec[i]["applicantFile"] =
        rec[i]["applicantFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/applicantFile/${rec[i]["applicantFile"]}`
          : null;
      rec[i]["experienceFile"] =
        rec[i]["experienceFile"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/experienceFile/${rec[i]["experienceFile"]}`
          : null;
      rec[i]["portfolio"] =
        rec[i]["portfolio"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/portfolio/${rec[i]["portfolio"]}`
          : null;
      rec[i]["vaccince"] =
        rec[i]["vaccince"] != ""
          ? `https://hris.afkaaruna.sch.id/assets/vaccince/${rec[i]["vaccince"]}`
          : null;
    }

    return res.status(200).json({
      status: 200,
      result: rec,
    });
  } catch (err) {
    return res.json({
      status: 500,
      message: "Server error",
    });
  }
}

module.exports.getCountApplicant = async (req, res) => {
  try {

    const applicant = await Applicant.count({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ]
      }
    });

    return res.status(200).json({
      status: 200,
      count: applicant
    });

  } catch (err) {
    return res.status(200).json({
      status: 500,
      message: "Server error"
    });
  }
}
