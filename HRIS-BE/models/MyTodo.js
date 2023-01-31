const Sequelize = require("sequelize");
const db = require("../config/database.js");

const MyTodo = db.define('mytodos', {
    // Define attributes
    title: Sequelize.STRING,
    date: Sequelize.STRING,
    time: Sequelize.STRING,
    calendar: Sequelize.STRING,
    details: Sequelize.STRING,
    employeeId: Sequelize.INTEGER,
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
module.exports = MyTodo;