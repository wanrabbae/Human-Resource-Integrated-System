const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Package = db.define(
  "packages",
  {
    // Define attributes
    name: Sequelize.STRING,
    duration_type: Sequelize.STRING,
    duration_number: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    status: Sequelize.CHAR,
    max_employee: Sequelize.STRING,
    max_subadmin: Sequelize.STRING,
    max_subdiary: Sequelize.STRING,
    max_employee_subsdiary: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Package;
