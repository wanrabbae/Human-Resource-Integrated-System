const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Branch = db.define(
  "workshifts",
  {
    // Define attributes
    name: Sequelize.STRING,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    duration: Sequelize.STRING,
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

const Employee = db.define(
  "employees",
  {
    // Define attributes
    image: Sequelize.STRING,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    joinDate: Sequelize.STRING,
    jobtitle_id: Sequelize.STRING,
    employeestatus_id: Sequelize.STRING,
    category_id: Sequelize.STRING,
    subUnit: Sequelize.STRING,
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

const JobPosition = db.define(
  "jobpositions",
  {
    // Define attributes
    name: Sequelize.STRING,
    job_id: Sequelize.STRING,
    grade_id: Sequelize.INTEGER,
    shift_id: Sequelize.INTEGER,
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

Branch.hasMany(Employee, {
    foreignKey: "shift_id"
});
Branch.hasMany(JobPosition, {
    foreignKey: "shift_id"
});
Employee.belongsTo(Branch, {
    foreignKey: "shift_id"
})
JobPosition.belongsTo(Branch, {
    foreignKey: "shift_id"
})

// Export model Product
module.exports = Branch;
