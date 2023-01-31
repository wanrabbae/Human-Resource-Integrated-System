const Nationality = require("../models/Nationality.js");
const {Op} = require("sequelize")

module.exports.getNationalities = async (req, res) => {
  try {
    const result = await Nationality.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
    });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports.addNationalities = async (req, res) => {
  try {
    const result = await Nationality.create({
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
    console.log(err);
  }
};

module.exports.deleteNationalities = async (req, res) => {
  try {
    const result = await Nationality.destroy({
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
    console.log(err);
    res.send(err);
  }
};

module.exports.updateNationalities = async (req, res) => {
  try {
    const result = await Nationality.update(
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
    console.log(err);
  }
};
