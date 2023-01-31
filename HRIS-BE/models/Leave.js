const Sequelize = require("sequelize");
const db = require("../config/database.js");
const LeaveType = require("./LeaveType.js");
const Employee = require("./Employee.js");
const Emergencycontact = require("./Emergencycontact.js");
const { JobPosition } = require("./JobModels.js");

const Leave = db.define(
  "leaves",
  {
    // Define attributes
    employeeId: Sequelize.INTEGER,
    jobposition_id: Sequelize.INTEGER,
    leave_type_id: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    leave_duration: Sequelize.INTEGER,
    remaining_days: Sequelize.INTEGER,
    note: Sequelize.STRING,
    delegated_to: Sequelize.INTEGER,
    delegated_task: Sequelize.TEXT,
    emergencycontact_id: Sequelize.INTEGER,
    date: Sequelize.DATE,
    unique_id: Sequelize.STRING,
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Leave.belongsTo(LeaveType, {
  as: "leave_type",
  sourceKey: "id",
  foreignKey: "leave_type_id",
});

Leave.belongsTo(Employee, {
  as: "employee",
  sourceKey: "id",
  foreignKey: "employeeId",
});

Leave.belongsTo(JobPosition, {
  as: "jobposition",
  sourceKey: "id",
  foreignKey: "jobposition_id",
});

Leave.belongsTo(Employee, {
  as: "delegated_employee",
  sourceKey: "id",
  foreignKey: "delegated_to",
});

Leave.belongsTo(Emergencycontact, {
  as: "emergency_contact",
  sourceKey: "id",
  foreignKey: "emergencycontact_id",
});

module.exports = Leave;
