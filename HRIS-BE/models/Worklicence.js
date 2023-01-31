const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const Branch = db.define('worklicenses', {
    // Define attributes
    employeeId: Sequelize.STRING,
    licenseType: Sequelize.STRING,
    licenseNumber: Sequelize.STRING,
    issuedDate: Sequelize.STRING,
    expiryDate: Sequelize.STRING,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },

}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Branch.belongsTo(Employee, {
    foreignKey: "employeeId"
})

// Export model Product
module.exports = Branch;