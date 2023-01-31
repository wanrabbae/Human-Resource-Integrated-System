const Sequelize = require("sequelize");
const db = require("../../config/database.js");

const EthosSource = db.define('ethossources', {
    // Define attributes
    name: Sequelize.STRING,

}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = EthosSource;