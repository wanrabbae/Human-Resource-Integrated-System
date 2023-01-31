const Profit = require("../models/Profit");
const Cost = require("../models/Cost");
const { Op } = require("sequelize");

module.exports.getProfit = async (req, res) => {
  try {
    const result = await Profit.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
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

module.exports.addProfit = async (req, res) => {
  try {
    const result = await Profit.create({
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
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.deleteProfit = async (req, res) => {
  try {
    const result = await Profit.destroy({
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

module.exports.updateProfit = async (req, res) => {
  try {
    await Profit.update(
      {
        name: req.body.name,
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

module.exports.getCost = async (req, res) => {
  try {
    const result = await Cost.findAll({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
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

module.exports.addCost = async (req, res) => {
  try {
    const result = await Cost.create({
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
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};

module.exports.deleteCost = async (req, res) => {
  try {
    const result = await Cost.destroy({
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

module.exports.updateCost = async (req, res) => {
  try {
    await Cost.update(
      {
        name: req.body.name,
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
