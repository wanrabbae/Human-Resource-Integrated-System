const Sequelize = require("sequelize");
const Applicant = require("./Applicant.js");
const db = require("../config/database.js");

const Notification = db.define(
  "notifications",
  {
    // Define attributes
    title: Sequelize.STRING,
    link: Sequelize.STRING,
    employeeId: Sequelize.STRING,
    applicant_id: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
    createdAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updatedAt: {
      type: "TIMESTAMP",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: true,
  }
);

Applicant.associate = (models) => {
  Applicant.hasOne(Notification, {
    foreignKey: "applicant_id",
  });
};

// Export model Product
module.exports = Notification;
