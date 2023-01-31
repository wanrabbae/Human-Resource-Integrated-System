const db = require("../config/database.js");
const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const Organization = require("./Organization.js");
// const Employee = require("./Employee.js");

const Employee = db.define(
  "employees",
  {
    // Define attributes
    image: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    joinDate: Sequelize.DATE,
    jobtitle_id: Sequelize.STRING,
    employeestatus_id: Sequelize.STRING,
    jobgrade_id: Sequelize.STRING,
    joblevel_id: Sequelize.STRING,
    jobposition_id: Sequelize.STRING,
    location: Sequelize.STRING,
    otherId: Sequelize.STRING,
    driverLicence: Sequelize.STRING,
    licenceExpire: Sequelize.STRING,
    nationality_id: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    birthDate: Sequelize.STRING,
    gender: Sequelize.STRING,
    street: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    country: Sequelize.STRING,
    phone: Sequelize.STRING,
    mobilePhone: Sequelize.STRING,
    email: Sequelize.STRING,
    otherEmail: Sequelize.STRING,
    npwp: Sequelize.STRING,
    religion: Sequelize.STRING,
    unique_id: Sequelize.STRING,
    shift_id: Sequelize.INTEGER,
    report_id: Sequelize.STRING,
    contractStart: Sequelize.DATE,
    contractEnd: Sequelize.DATE,
    contractFile: Sequelize.STRING,
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

const JobGrade = db.define(
  "jobgrades",
  {
    // Define attributes
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    rangegrade: Sequelize.STRING,
    minsalary: Sequelize.STRING,
    maxsalary: Sequelize.STRING,
    unique_id: Sequelize.STRING,
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

const JobTitle = db.define(
  "jobtitles",
  {
    // Define attributes
    name: Sequelize.STRING,
    grade_id: Sequelize.INTEGER,
    specification: Sequelize.STRING,
    note: Sequelize.STRING,
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

const JobLevel = db.define(
  "joblevels",
  {
    // Define attributes
    name: Sequelize.STRING,
    grade_id: Sequelize.INTEGER,
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
    relation_code: Sequelize.STRING,
    color: Sequelize.STRING,
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

JobGrade.hasMany(JobTitle, {
  foreignKey: "grade_id",
});

JobGrade.hasMany(JobLevel, {
  foreignKey: "grade_id",
});

JobGrade.hasMany(JobPosition, {
  foreignKey: "grade_id",
});

JobTitle.belongsTo(JobGrade, {
  foreignKey: "grade_id",
});

JobLevel.belongsTo(JobGrade, {
  foreignKey: "grade_id",
});

JobPosition.belongsTo(JobGrade, {
  foreignKey: "grade_id",
});

JobTitle.hasMany(Employee, {
  foreignKey: "jobtitle_id",
});
JobLevel.hasMany(Employee, {
  foreignKey: "joblevel_id",
});
JobPosition.hasMany(Employee, {
  foreignKey: "jobposition_id",
});
JobGrade.hasMany(Employee, {
  foreignKey: "jobgrade_id",
});
JobPosition.hasMany(Organization, {
  foreignKey: "position_id",
});
Organization.belongsTo(JobPosition, {
  foreignKey: "position_id",
});

module.exports = {
  JobGrade,
  JobTitle,
  JobLevel,
  JobPosition,
};
