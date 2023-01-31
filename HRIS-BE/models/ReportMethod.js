const Sequelize = require("sequelize");
const db = require("../config/database.js");

const ReportMethod = db.define(
  "reportingmethods",
  {
    // Define attributes
    name: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

// Export model Product
module.exports = ReportMethod;
