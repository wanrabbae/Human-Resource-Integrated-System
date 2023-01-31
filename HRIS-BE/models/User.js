const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Role = require("./Role.js");
// const Subsdiaries = require("./Subsdiary.js");

const Branch = db.define(
  "users",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    role: Sequelize.STRING,
    role_id: Sequelize.INTEGER,
    parent_role_id: Sequelize.INTEGER,
    status: Sequelize.STRING,
    location: Sequelize.STRING,
    phone: Sequelize.STRING,
    package_id: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
    email_verified: Sequelize.BOOLEAN,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
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

const Subsdiaries = db.define(
  "subsdiaries",
  {
    // Define attributes
    user_id: Sequelize.INTEGER,
    logo: Sequelize.STRING,
    fullname: Sequelize.STRING,
    register_number: Sequelize.STRING,
    tax_id: Sequelize.STRING,
    phone: Sequelize.STRING,
    address1: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    country: Sequelize.STRING,
    postal_code: Sequelize.STRING,
    notes: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Employee.hasOne(Branch);

Branch.belongsTo(Employee);
Branch.belongsTo(Role, {
  as: "roles",
  sourceKey: "id",
  foreignKey: "role_id",
});
Branch.hasOne(Subsdiaries, {
  as: "subsdiary",
  sourceKey: "id",
  foreignKey: "user_id",
});

// Export model Product
module.exports = Branch;
