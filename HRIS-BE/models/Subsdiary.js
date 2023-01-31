const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./User.js");

const Subsdiaries = db.define(
  "subsdiaries",
  {
    // Define attributes
    user_id: Sequelize.INTEGER,
    logo: Sequelize.STRING,
    fullname: Sequelize.STRING,
    register_number: Sequelize.STRING,
    tax_id: Sequelize.STRING,
    fax: Sequelize.STRING,
    phone: Sequelize.STRING,
    address1: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    notes: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Subsdiaries.belongsTo(User, {
  as: "user",
  sourceKey: "id",
  foreignKey: "user_id",
});

// Export model Product
module.exports = Subsdiaries;
