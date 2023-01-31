const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingThr = db.define('payroll_setting_thr', {
    // Define attributes
    unique_id: Sequelize.STRING,
    prorate: Sequelize.STRING,
    new_employee_month: Sequelize.INTEGER,
    thr_component: Sequelize.STRING,
    data: Sequelize.TEXT,
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
module.exports = PayrollSettingThr;