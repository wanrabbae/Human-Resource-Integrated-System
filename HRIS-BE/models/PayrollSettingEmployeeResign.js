const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingUpUmpk = db.define('payroll_setting_up_umpk', {
    // Define attributes
    operator: Sequelize.ENUM("<", ">", "=", "<=", ">="),
    tahun: Sequelize.STRING,
    gaji_bulanan: Sequelize.INTEGER,
    type: Sequelize.ENUM("up", "umpk"),
    unique_id: Sequelize.STRING,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

const PayrollSettingUph = db.define('payroll_setting_uph', {
    // Define attributes
    name: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
    created_at: {
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
module.exports = { PayrollSettingUpUmpk, PayrollSettingUph };