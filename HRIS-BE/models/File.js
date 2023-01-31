const Sequelize = require("sequelize");
const Employee = require("./Employee.js");
const db = require("../config/database.js");

const Files = db.define('files', {
    // Define attributes
    file: Sequelize.STRING,
    type: Sequelize.STRING,
    filename: Sequelize.STRING,
    size: Sequelize.STRING,
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

Files.belongsTo(Employee, {
  foreignKey: "employeeId",
});

// Export model Product
module.exports = Files;