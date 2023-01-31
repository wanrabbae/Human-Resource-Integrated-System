const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");
const TerminationReason = require("./TerminationReason.js");

const EmployeeTermination = db.define('employeetermination', {
    // Define attributes
    employeeId: Sequelize.STRING,
    date: Sequelize.DATE,
    termination_reason_id: Sequelize.STRING,
    note: Sequelize.STRING,
    unique_id: Sequelize.STRING,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

EmployeeTermination.belongsTo(Employee, {
    foreignKey: "employeeId"
});
EmployeeTermination.belongsTo(TerminationReason, {
    foreignKey: "termination_reason_id"
});

// Export model Product
module.exports = EmployeeTermination;