const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollHistory = db.define('payroll_history', {
    // Define attributes
    run_payroll_id: Sequelize.STRING,
    payment_date: Sequelize.DATE,
    payment_time: Sequelize.TIME,
    total_employee: Sequelize.INTEGER,
    total_pay: Sequelize.STRING,
    run_by: Sequelize.STRING,
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
    timestamps: false
});

// Export model Product
module.exports = PayrollHistory;