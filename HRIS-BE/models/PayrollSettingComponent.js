const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingComponent = db.define('payroll_setting_component', {
    // Define attributes
    name: Sequelize.STRING,
    amount: Sequelize.STRING,
    payment_period: Sequelize.STRING,
    tax: Sequelize.STRING,
    payment_date: Sequelize.DATE,
    delegated_to: Sequelize.TEXT,
    type: Sequelize.ENUM("income", "deduction", "benefit"),
    sub_type: Sequelize.ENUM("all", "employee", "filter"),
    unique_id: Sequelize.STRING,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = PayrollSettingComponent;