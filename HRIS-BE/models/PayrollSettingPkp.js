const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingPkp = db.define('payroll_setting_pkp', {
    // Define attributes
    income_from: Sequelize.STRING,
    income_to: Sequelize.STRING,
    rate: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = PayrollSettingPkp;