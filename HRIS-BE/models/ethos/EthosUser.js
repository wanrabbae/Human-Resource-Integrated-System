const Sequelize = require("sequelize");
const db = require("../../config/database.js");

const EthosUser = db.define('ethosusers', {
    // Define attributes
    username: Sequelize.STRING,
    employeeName: Sequelize.STRING,
    role: Sequelize.STRING,
    status: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = EthosUser;