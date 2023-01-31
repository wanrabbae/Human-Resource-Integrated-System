const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./User.js");
const Package = require("./Package.js");

const Transaction = db.define(
  "transactions",
  {
    // Define attributes
    user_id: Sequelize.INTEGER,
    package_id: Sequelize.INTEGER,
    invoice: Sequelize.STRING,
    total_subdiary: Sequelize.INTEGER,
    total_employee: Sequelize.INTEGER,
    total_transaction: Sequelize.INTEGER,
    date: Sequelize.DATE,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Transaction.belongsTo(User, {
  as: "user",
  sourceKey: "id",
  foreignKey: "user_id",
});

Transaction.belongsTo(Package, {
  as: "package",
  sourceKey: "id",
  foreignKey: "package_id",
});

module.exports = Transaction;
