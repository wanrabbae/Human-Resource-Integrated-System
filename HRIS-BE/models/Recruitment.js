const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Applicant = require("./Applicant.js");
const SpesificRecruitment = require("./SpesificRecruitment.js");

const Branch = db.define(
  "recruitments",
  {
    // Define attributes
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    position: Sequelize.STRING,
    placement: Sequelize.STRING,
    jobDescription: Sequelize.STRING,
    qualification: Sequelize.STRING,
    location: Sequelize.STRING,
    type: Sequelize.STRING,
    publishDate: Sequelize.STRING,
    expiredDate: Sequelize.STRING,
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

Branch.hasMany(Applicant, {
  foreignKey: "recruitment_id",
});

Branch.hasOne(SpesificRecruitment, {
  foreignKey: "recruitment_id",
});

// Export model Product
module.exports = Branch;
