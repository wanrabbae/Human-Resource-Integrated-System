const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Branch = db.define(
  "skills",
  {
    // Define attributes
    name: Sequelize.STRING,
    description: Sequelize.STRING,
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

const WorkSkill = db.define(
  "workskills",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    skill_id: Sequelize.STRING,
    yearsOfExperience: Sequelize.STRING,
    comment: Sequelize.STRING,
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

Branch.hasMany(WorkSkill, {
  foreignKey: "skill_id",
});

// Export model Product
module.exports = Branch;
