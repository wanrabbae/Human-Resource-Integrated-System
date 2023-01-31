const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingThp = db.define('payroll_setting_thp', {
    // Define attributes
    prorate_type: Sequelize.STRING,
    number: Sequelize.INTEGER,
    is_count_national_holiday: Sequelize.BOOLEAN,
    salary_tax_setting: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = PayrollSettingThp;