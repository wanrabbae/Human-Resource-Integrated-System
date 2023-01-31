const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");
const PayrollComponent = require("./PayrollComponent.js")

const EmployeePayroll = db.define('employee_payroll', {
    // Define attributes
    employeeId: Sequelize.INTEGER,
    ptkp_status: Sequelize.STRING,
    salary_type: Sequelize.STRING,
    prorate: Sequelize.STRING,
    npp_bpjs: Sequelize.STRING,
    tax_config: Sequelize.STRING,
    salary_tax: Sequelize.STRING,
    bpjs_kesehatan: Sequelize.STRING,
    bpjs_ketenagakerjaan: Sequelize.STRING,
    npwp: Sequelize.STRING,
    bank: Sequelize.STRING,
    bank_name: Sequelize.STRING,
    bank_number: Sequelize.STRING,
    payroll_component_id: Sequelize.INTEGER,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

EmployeePayroll.belongsTo(Employee, {
    foreignKey: "employeeId",
});

EmployeePayroll.belongsTo(PayrollComponent, {
    foreignKey: "payroll_component_id",
});

// Export model Product
module.exports = EmployeePayroll;