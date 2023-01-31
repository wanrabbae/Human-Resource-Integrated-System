const Transaction = require("../models/Transaction.js");
const User = require("../models/User.js");
const Package = require("../models/Package.js");

function getRandomString(count) {
  // Generate a random string of characters
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < count; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

const getAllTransaction = async (req, res) => {
  try {
    const result = await Transaction.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "name", "phone"] },
        { model: Package, as: "package", attributes: ["id", "name", "price"] },
      ],
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getTransaction = async (req, res) => {
  try {
    const result = await Transaction.findByPk(req.params.id, {
      include: [
        { model: User, as: "user" },
        { model: Package, as: "package" },
      ],
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addTransaction = async (req, res) => {
  try {
    const result = await Transaction.create({
      user_id: req.userData.id,
      package_id: req.body.package_id,
      invoice: "HMS-" + getRandomString(4),
      total_subdiary: req.body.total_subdiary,
      total_employee: req.body.total_employee,
      total_transaction: req.body.total_transaction,
    });

    return res.jsonSuccessCreated("Success create Transaction");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const result = await Transaction.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Transaction");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  addTransaction,
  getAllTransaction,
  getTransaction,
  deleteTransaction,
};
