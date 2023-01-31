const Sequelize = require("sequelize");
const db = require("../../config/database.js");

const EthosGalery = db.define('ethosgaleries', {
    // Define attributes
    photo: Sequelize.STRING,
    title: Sequelize.STRING,
    description: Sequelize.STRING,
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
module.exports = EthosGalery;