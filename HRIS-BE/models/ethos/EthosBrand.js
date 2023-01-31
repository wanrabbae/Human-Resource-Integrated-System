const Sequelize = require("sequelize");
const db = require("../../config/database.js");

const EthosBrand = db.define('ethosbrands', {
    // Define attributes
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    image: Sequelize.STRING,
    // created_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // },
    // updated_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // },

}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

// Export model Product
module.exports = EthosBrand;