const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const EmployeeRecord = db.define(
  "employeerecords",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    date: Sequelize.STRING,
    checkIn: Sequelize.STRING,
    noteCheckIn: Sequelize.STRING,
    checkOut: Sequelize.STRING,
    noteCheckOut: Sequelize.STRING,
    isChecked: Sequelize.INTEGER,
    duration: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    imageIn: Sequelize.STRING,
    imageOut: Sequelize.STRING,
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
    timestamps: true,
  }
);

EmployeeRecord.belongsTo(Employee, {
  foreignKey: "employeeId",
});

// Export model Product
module.exports = EmployeeRecord;
