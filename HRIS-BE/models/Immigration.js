const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const Branch = db.define(
  "immigrations",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    documentType: Sequelize.STRING,
    number: Sequelize.STRING,
    issueDate: Sequelize.STRING,
    expiryDate: Sequelize.STRING,
    eligibleStatus: Sequelize.STRING,
    issuedby: Sequelize.STRING,
    eligileIssueDate: Sequelize.STRING,
    comment: Sequelize.STRING,

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

Branch.belongsTo(Employee, {
  foreignKey: "employeeId",
});

// Export model Product
module.exports = Branch;
