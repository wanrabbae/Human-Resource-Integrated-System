const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Employee = require("./Employee.js");
const { JobPosition } = require("./JobModels.js");

const Overtime = db.define("overtime", {
  // Define Attribute 
  employeeId: Sequelize.STRING,
  job_id: Sequelize.STRING,
  overtimeSubmissionDate: Sequelize.DATE,
  overtimeOnDate: Sequelize.DATE,
  startTime: Sequelize.TIME,
  endTime: Sequelize.TIME,
  description: Sequelize.STRING,
  unique_id: Sequelize.STRING,
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending",
  },
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
  });

Overtime.belongsTo(Employee, {
  foreignKey: "employeeId",
});

Overtime.belongsTo(JobPosition, {
  foreignKey: "id",
});

module.exports = Overtime;