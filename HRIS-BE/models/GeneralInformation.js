const db = require("../config/database.js");
const Sequelize = require("sequelize");

const G_I = db.define(
  "generalinformation",
  {
    // Define attributes
    organization_name: Sequelize.STRING,
    register_number: Sequelize.STRING,
    tax_id: Sequelize.STRING,
    phone: Sequelize.STRING,
    fax: Sequelize.STRING,
    email: Sequelize.STRING,
    address_1: Sequelize.STRING,
    address_2: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    country: Sequelize.STRING,
    notes: Sequelize.STRING,
    image: Sequelize.STRING,
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

module.exports = G_I;
