const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Coupon = db.define(
  "coupons",
  {
    // Define attributes
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    referral_code: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    repeat: Sequelize.STRING,
    status: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Coupon;
