const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Stage = require("./Stage.js");
const Notification = require("./Notification.js");
const { DataTypes } = Sequelize;

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

const Applicant = db.define(
  "applicants",
  {
    recruitment_id: DataTypes.INTEGER,
    source: DataTypes.STRING,
    date: DataTypes.DATE,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    identityAddress: DataTypes.STRING,
    identityNumber: DataTypes.INTEGER,
    religion: DataTypes.STRING,
    npwp: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    age: DataTypes.STRING,
    citizen: DataTypes.STRING,
    experience: DataTypes.STRING,
    educations: DataTypes.STRING,
    marital: DataTypes.STRING,
    kartuKeluarga: DataTypes.STRING,
    last_salary: DataTypes.INTEGER,
    expected_salary: DataTypes.INTEGER,
    applicantFile: DataTypes.STRING,
    ktp: DataTypes.STRING,
    ijazah: DataTypes.STRING,
    transkripNilai: DataTypes.STRING,
    portfolio: DataTypes.STRING,
    vaccince: DataTypes.STRING,
    status: DataTypes.STRING,
    archive: DataTypes.INTEGER,
    unique_id: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Stage.belongsTo(Applicant, {
  foreignKey: "applicant_id",
});

Notification.belongsTo(Applicant, {
  foreignKey: "applicant_id",
});

Applicant.belongsTo(Recruitment, {
  foreignKey: "recruitment_id",
});

module.exports = Applicant;
