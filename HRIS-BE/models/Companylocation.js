const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Branch = db.define(
  "companylocations",
  {
    // Define attributes
    name: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    phone: Sequelize.STRING,
    fax: Sequelize.STRING,
    address: Sequelize.STRING,
    note: Sequelize.STRING,
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
module.exports = Branch;
