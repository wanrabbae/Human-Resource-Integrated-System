const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Cost = db.define(
  "costs",
  {
    // Define attributes
    name: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
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
module.exports = Cost;
