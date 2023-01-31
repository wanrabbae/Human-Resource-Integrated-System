const Sequelize = require("sequelize");
const db = require("../config/database.js");
const {JobTitle} = require("./JobModels.js");
const Employee = require("./Employee.js");

const Branch = db.define('workexperiences', {
    // Define attributes
    employeeId: Sequelize.STRING,
    companyName: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
    startDate: Sequelize.STRING,
    endDate: Sequelize.STRING,
    comment: Sequelize.STRING,
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

Branch.belongsTo(JobTitle, {
    foreignKey: "jobTitle"
});
Branch.belongsTo(Employee, {
    foreignKey: "employeeId"
})

// Export model Product
module.exports = Branch;