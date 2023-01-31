const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Employee = require("./Employee.js");

const Branch = db.define(
  "reports",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    name: Sequelize.STRING,
    criteria: Sequelize.STRING,
    include: Sequelize.STRING,
    displayFieldGroup: Sequelize.STRING,
    displayField: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    created_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Employee.hasMany(Branch, {
  foreignKey: "employeeId",
});

Branch.belongsTo(Employee, {
  foreignKey: "employeeId",
});

// Export model Product
module.exports = Branch;
