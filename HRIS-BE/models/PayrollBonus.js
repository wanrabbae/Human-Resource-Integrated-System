const Sequelize = require("sequelize");
const db = require("../config/database.js");

const PayrollBonus = db.define('payroll_bonus', {
    // Define attributes
    name: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    status: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    delegated_to: Sequelize.JSON,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = PayrollBonus;