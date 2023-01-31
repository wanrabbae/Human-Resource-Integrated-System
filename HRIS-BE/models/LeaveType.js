const Sequelize = require("sequelize");
const db = require("../config/database.js");

const LeaveType = db.define(
  "leave_types",
  {
    // Define attributes
    name: Sequelize.STRING,
    max_duration: Sequelize.INTEGER,
    submission_before: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = LeaveType;
