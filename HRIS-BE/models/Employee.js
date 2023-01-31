const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Workshift = require("./Workshift.js");
const { JobTitle, JobGrade, JobLevel, JobPosition } = require("./JobModels");

const Branch = db.define(
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
    position_id: Sequelize.STRING,
    superior_title: Sequelize.STRING,
    superior_id: Sequelize.STRING,
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

const EmployeeStatus = db.define(
  "employeestatuses",
  {
    // Define attributes
    name: Sequelize.STRING,
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

const Report = db.define(
  "reports",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    name: Sequelize.STRING,
    criteria: Sequelize.STRING,
    include: Sequelize.STRING,
    displayFieldGroup: Sequelize.STRING,
    displayField: Sequelize.STRING,
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

const Nationality = db.define(
  "nationalities",
  {
    // Define attributes
    name: Sequelize.STRING,
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

const EmployeeRecord = db.define(
  "employeerecords",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    date: Sequelize.STRING,
    checkIn: Sequelize.STRING,
    noteCheckIn: Sequelize.STRING,
    checkOut: Sequelize.STRING,
    noteCheckOut: Sequelize.STRING,
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

const Files = db.define(
  "files",
  {
    // Define attributes
    file: Sequelize.STRING,
    type: Sequelize.STRING,
    filename: Sequelize.STRING,
    size: Sequelize.STRING,
    employeeId: Sequelize.INTEGER,
    // created_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // },
    // updated_at: {
    //     type: 'TIMESTAMP',
    //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    //     allowNull: false
    // },
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

const Schedule = db.define(
  "schedules",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    schedule: Sequelize.STRING,
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

const Immigration = db.define(
  "immigrations",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    documentType: Sequelize.STRING,
    number: Sequelize.STRING,
    issueDate: Sequelize.STRING,
    expiryDate: Sequelize.STRING,
    eligibleStatus: Sequelize.STRING,
    issuedby: Sequelize.STRING,
    eligileIssueDate: Sequelize.STRING,
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

const Emergency = db.define(
  "emergencycontacts",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    name: Sequelize.STRING,
    relationship: Sequelize.STRING,
    phone: Sequelize.STRING,
    mobilePhone: Sequelize.STRING,
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

const Dependent = db.define(
  "dependents",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    name: Sequelize.STRING,
    relationship: Sequelize.STRING,
    birthDate: Sequelize.STRING,
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

const Workexperience = db.define(
  "workexperiences",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    companyName: Sequelize.STRING,
    jobTitle: Sequelize.STRING,
    startDate: Sequelize.STRING,
    endDate: Sequelize.STRING,
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

const WorkLicense = db.define(
  "worklicences",
  {
    // Define attributes
    employeeId: Sequelize.STRING,
    licence_id: Sequelize.STRING,
    issuedDate: Sequelize.STRING,
    expiryDate: Sequelize.STRING,
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

const EmployeePayroll = db.define('employee_payroll', {
  // Define attributes
  employeeId: Sequelize.INTEGER,
  ptkp_status: Sequelize.STRING,
  salary_type: Sequelize.STRING,
  prorate: Sequelize.STRING,
  npp_bpjs: Sequelize.STRING,
  tax_config: Sequelize.STRING,
  salary_tax: Sequelize.STRING,
  bpjs_kesehatan: Sequelize.STRING,
  bpjs_ketenagakerjaan: Sequelize.STRING,
  npwp: Sequelize.STRING,
  bank: Sequelize.STRING,
  bank_name: Sequelize.STRING,
  bank_number: Sequelize.STRING,
  payroll_component_id: Sequelize.INTEGER,
}, {
  // Freeze Table Name
  freezeTableName: true,
  timestamps: false
});

Branch.belongsTo(JobTitle, {
  foreignKey: "jobtitle_id",
});
Branch.belongsTo(JobGrade, {
  foreignKey: "jobgrade_id",
});
Branch.belongsTo(JobLevel, {
  foreignKey: "joblevel_id",
});
Branch.belongsTo(JobPosition, {
  foreignKey: "jobposition_id",
});

Branch.belongsTo(EmployeeStatus, {
  foreignKey: "employeestatus_id",
});

Branch.belongsTo(Workshift, {
  foreignKey: "shift_id",
});

Branch.belongsTo(Nationality, {
  foreignKey: "nationality_id",
});

Branch.hasMany(Report, {
  foreignKey: "employeeId",
});

Branch.hasMany(EmployeeRecord, {
  foreignKey: "employeeId",
});

Branch.hasMany(Files, {
  foreignKey: "employeeId",
});

Branch.hasMany(Schedule, {
  foreignKey: "employeeId",
});

Report.belongsTo(Branch, {
  foreignKey: "employeeId",
});

EmployeeRecord.belongsTo(Branch, {
  foreignKey: "employeeId",
});
Files.belongsTo(Branch, {
  foreignKey: "employeeId",
});

Schedule.belongsTo(Branch, {
  foreignKey: "employeeId",
});

Branch.hasMany(Immigration, {
  foreignKey: "employeeId",
});

Branch.hasMany(Dependent, {
  foreignKey: "employeeId",
});

Branch.hasMany(Emergency, {
  foreignKey: "employeeId",
});

Branch.hasMany(WorkSkill, {
  foreignKey: "employeeId",
});

Branch.hasMany(Workexperience, {
  foreignKey: "employeeId",
});

Branch.hasMany(WorkLicense, {
  foreignKey: "employeeId",
});

EmployeeStatus.hasMany(Branch, {
  foreignKey: "employeestatus_id",
});
JobTitle.hasMany(Branch, {
  foreignKey: "jobtitle_id",
});
JobLevel.hasMany(Branch, {
  foreignKey: "joblevel_id",
});
JobPosition.hasMany(Branch, {
  foreignKey: "jobposition_id",
});
JobGrade.hasMany(Branch, {
  foreignKey: "jobgrade_id",
});

Branch.hasMany(EmployeePayroll, {
  foreignKey: "employeeId",
});

// Export model Product
module.exports = Branch;
