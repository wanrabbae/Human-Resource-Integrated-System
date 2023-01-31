const Sequelize = require("sequelize");
const Applicant = require("./Applicant.js");
const db = require("../config/database.js");

const Stage = db.define(
  "stages",
  {
    // Define attributes
    applicant_id: Sequelize.INTEGER,
    stage: Sequelize.STRING,
    note: Sequelize.STRING,
    status: Sequelize.INTEGER,
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

Applicant.associate = (models) => {
  Applicant.hasOne(Stage, {
    foreignKey: "applicant_id",
  });
};

// Export model Product
module.exports = Stage;
