const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingBpjs = db.define('payroll_setting_bpjs_kk', {
    // Define attributes
    npp_name: Sequelize.STRING,
    npp_number: Sequelize.STRING,
    branch: Sequelize.STRING,
    jkk: Sequelize.STRING,
    unique_id: Sequelize.STRING,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = PayrollSettingBpjs;