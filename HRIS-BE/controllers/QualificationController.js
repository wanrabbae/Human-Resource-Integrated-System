const Skill = require("../models/Skill.js");
const Education = require("../models/Education.js");
const License = require("../models/Licence.js");
const Language = require("../models/Language.js");
const Membership = require("../models/Membership.js");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

module.exports.addSkill = async (req, res) => {
  try {
    const result = await Skill.create({
      name: req.body.name,
      description: req.body.description,
      unique_id: req.userData.unique_id,
    });

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
};
module.exports.updateSkill = async (req, res) => {
  try {
    const result = await Skill.update(
      {
        name: req.body.name,
        description: req.body.description,
      },
      { where: { id: req.body.id } }
    );

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteSkill = async (req, res) => {
  try {
    const result = await Skill.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      message: err,
    });
    console.log(err);
  }
};
module.exports.getSkill = async (req, res) => {
  try {
    const result = await Skill.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
      order: [["id", "DESC"]],
    });
    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addEducation = async (req, res) => {
  try {
    const result = await Education.create({
      name: req.body.name,
      unique_id: req.body.unique_id,
    });

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.updateEducation = async (req, res) => {
  try {
    const result = await Education.update(
      {
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    );

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteEducation = async (req, res) => {
  try {
    const result = await Education.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getEducation = async (req, res) => {
  try {
    const result = await Education.findAll({
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
    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addLicense = async (req, res) => {
  try {
    var attachmentName;
    if (req.files.attachment) {
      const tempPath = req.files.attachment[0].path;
      attachmentName =
        req.files.attachment[0].filename +
        "." +
        req.files.attachment[0].mimetype.split("/")[1];
      const targetPath = path.join(`assets/license/${attachmentName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }
    const result = await License.create({
      name: req.body.name,
      attachment: attachmentName,
      unique_id: req.userData.unique_id,
    });

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send({
      error: error.toString(),
    });
    console.log(err);
  }
};
module.exports.updateLicense = async (req, res) => {
  try {
    if (req.files.attachment) {
      var data = await License.findOne({
        where: {
          id: req.body.id,
        },
      });

      fs.unlink(`assets/license/${data.attachment}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });

      const tempPath = req.files.attachment[0].path;
      const rename = `${req.files.attachment[0].filename}.${
        req.files.attachment[0].mimetype.split("/")[1]
      }`;
      const targetPath = path.join(`assets/license/${rename}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });

      await License.update(
        {
          name: req.body.name,
          attachment: rename,
        },
        { where: { id: req.body.id } }
      );
    } else {
      await License.update(
        {
          name: req.body.name,
        },
        { where: { id: req.body.id } }
      );
    }

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};
module.exports.deleteLicense = async (req, res) => {
  try {
    var data = await License.findOne({
      where: {
        id: req.query.id,
      },
    });
    fs.unlink(`assets/license/${data.attachment}`, (err) => {
      if (err) throw err;
      console.log("path/file.txt was deleted");
    });
    await License.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getLicense = async (req, res) => {
  try {
    const result = await License.findAll({
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
    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addLanguage = async (req, res) => {
  try {
    const result = await Language.create({
      name: req.body.name,
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
module.exports.updateLanguage = async (req, res) => {
  try {
    const result = await Language.update(
      {
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    );

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteLanguage = async (req, res) => {
  try {
    const result = await Language.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getLanguage = async (req, res) => {
  try {
    const result = await Language.findAll({
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
    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addMembership = async (req, res) => {
  try {
    const result = await Membership.create({
      name: req.body.name,
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
module.exports.updateMembership = async (req, res) => {
  try {
    const result = await Membership.update(
      {
        name: req.body.name,
      },
      { where: { id: req.body.id } }
    );

    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.deleteMembership = async (req, res) => {
  try {
    const result = await Membership.destroy({ where: { id: req.query.id } });
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getMembership = async (req, res) => {
  try {
    const result = await Membership.findAll({
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
    res.send({
      status: 200,
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
};
