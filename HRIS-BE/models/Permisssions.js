// const { TIME, DATE } = require("sequelize");
const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Employee = require("./Employee.js");
const { JobPosition } = require("./JobModels.js");



const Permissions = db.define("permissions", {
  // Define Attribute 
  employeeId: Sequelize.STRING,
  job_id: Sequelize.STRING,
  permissionsReason: Sequelize.STRING,
  dateOfFiling: Sequelize.DATE,
  submissionTime: Sequelize.TIME,
  numberOfDays: Sequelize.INTEGER,
  startTime: Sequelize.TIME,
  endTime: Sequelize.TIME,
  backToWorkDate: Sequelize.DATE,
  backToWorkTime: Sequelize.TIME,
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
  }
);

Permissions.belongsTo(Employee, {
  foreignKey: "employeeId",
});

Permissions.belongsTo(JobPosition, {
  foreignKey: "id",
});

module.exports = Permissions;