const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollSettingPtkp = db.define('payroll_setting_ptkp', {
    // Define attributes
    unique_id: Sequelize.STRING,
    individual_taxpayer: Sequelize.STRING,
    additional_individual_taxpayer: Sequelize.STRING,
    additional_married_taxpayers: Sequelize.STRING,
    additional_dependents: Sequelize.STRING,
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: true
});

// Export model Product
module.exports = PayrollSettingPtkp;