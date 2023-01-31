const Sequelize = require("sequelize");
const db = require("../config/database.js");

const SpesificRecruitment = db.define(
  "spesificrecruitments",
  {
    recruitment_id: Sequelize.INTEGER,
    ageRange: Sequelize.STRING,
    gender: Sequelize.STRING,
    education: Sequelize.STRING,
    experience: Sequelize.STRING,
    skill: Sequelize.STRING,
    priority: Sequelize.STRING,
    created_at: {
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

const Recruitment = db.define(
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

SpesificRecruitment.belongsTo(Recruitment, {
  foreignKey: "recruitment_id",
});

// Export model Product
module.exports = SpesificRecruitment;
