const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const PayrollComponent = db.define('payroll_components', {
    // Define attributes
    employeeId: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
    basic_salary: Sequelize.STRING,
    incomes: Sequelize.JSON,
    deductions: Sequelize.JSON,
    benefits: Sequelize.JSON,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

PayrollComponent.belongsTo(Employee, {
    foreignKey: "employeeId",
});

// Export model Product
module.exports = PayrollComponent;