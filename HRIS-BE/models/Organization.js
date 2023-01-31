const Sequelize = require("sequelize");
const db = require("../config/database.js");
// const {JobPosition} = require("./JobModels.js");

const Branch = db.define(
  "organizations",
  {
    // Define attributes
    sequence: Sequelize.STRING,
    structure_id: Sequelize.STRING,
    color: Sequelize.STRING,
    position_id: Sequelize.INTEGER,
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

const JobPosition = db.define(
  "jobpositions",
  {
    // Define attributes
    name: Sequelize.STRING,
    job_id: Sequelize.STRING,
    grade_id: Sequelize.INTEGER,
    shift_id: Sequelize.INTEGER,
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

Branch.belongsTo(JobPosition, {
    foreignKey: "position_id",
});
JobPosition.belongsTo(Branch, {
    foreignKey: "position_id"
})

// Export model Product
module.exports = Branch;
