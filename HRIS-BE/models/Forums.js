const Sequelize = require("sequelize");
const Employee = require("./Employee.js");
const db = require("../config/database.js");

const Forums = db.define('forums', {
    // Define attributes
    employeeId: Sequelize.INTEGER,
    description: Sequelize.TEXT,
    unique_id: Sequelize.STRING,
    posted_at: Sequelize.DATE,
}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

Forums.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

// Export model Product
module.exports = Forums;