const db = require("../config/database.js");
const Sequelize = require("sequelize");
const Employee = require("../models/Employee.js");

const RBSetting = db.define("finance_reimbursement_settings", {
  name: Sequelize.STRING,
  limit_amount: Sequelize.STRING,
  min_next_claim: Sequelize.INTEGER,
  assign_to: Sequelize.TEXT,
  unique_id: Sequelize.STRING,
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const CASetting = db.define("finance_cash_advance_settings", {
  name: Sequelize.STRING,
  limit_amount: Sequelize.STRING,
  settlement_due: Sequelize.INTEGER,
  assign_to: Sequelize.TEXT,
  unique_id: Sequelize.STRING,
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const LoanSetting = db.define("finance_loan_settings", {
  name: Sequelize.STRING,
  max_installment: Sequelize.INTEGER,
  interest: Sequelize.INTEGER,
  unique_id: Sequelize.STRING,
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const Reimbursement = db.define("finance_reimbursement", {
  employeeId: Sequelize.INTEGER,
  reimbursement_setting_id: Sequelize.INTEGER,
  amount: Sequelize.STRING,
  use_date: Sequelize.DATE,
  note: Sequelize.TEXT,
  file: Sequelize.STRING,
  status: {
    type: Sequelize.CHAR,
    defaultValue: "pending"
  },
  unique_id: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const CashAdvance = db.define("finance_cash_advance", {
  employeeId: Sequelize.INTEGER,
  cash_advance_setting_id: Sequelize.INTEGER,
  amount: Sequelize.STRING,
  use_date: Sequelize.DATE,
  request_date: Sequelize.DATE,
  note: Sequelize.TEXT,
  status: {
    type: Sequelize.CHAR,
    defaultValue: "pending"
  },
  unique_id: Sequelize.STRING,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const Loan = db.define("finance_loan", {
  employeeId: Sequelize.INTEGER,
  loan_setting_id: Sequelize.INTEGER,
  amount: Sequelize.STRING,
  interest: Sequelize.INTEGER,
  note: Sequelize.TEXT,
  max_installment: Sequelize.STRING,
  status: {
    type: Sequelize.CHAR,
    defaultValue: "pending"
  },
  unique_id: Sequelize.STRING,
  use_date: Sequelize.DATE,
  request_date: Sequelize.DATE,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

const LoanInstallment = db.define("loan_installment", {
  loan_id: Sequelize.INTEGER,
  installment_to: Sequelize.INTEGER,
  payment_nominal: Sequelize.STRING,
  unique_id: Sequelize.STRING,
  payment_date: Sequelize.DATE,
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  }
},
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  })

RBSetting.hasMany(Reimbursement, {
  foreignKey: "reimbursement_setting_id",
})

CASetting.hasMany(CashAdvance, {
  foreignKey: "cash_advance_setting_id",
})

LoanSetting.hasMany(Loan, {
  foreignKey: "loan_setting_id",
})

Reimbursement.belongsTo(RBSetting, {
  foreignKey: "reimbursement_setting_id",
  as: "reimbursement_setting"
})

CashAdvance.belongsTo(CASetting, {
  foreignKey: "cash_advance_setting_id",
  as: "cash_setting"
})

Loan.belongsTo(LoanSetting, {
  foreignKey: "loan_setting_id",
  as: "loan_setting"
})

Reimbursement.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee"
})

CashAdvance.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee"
})

Loan.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee"
})

Loan.hasMany(LoanInstallment, {
  foreignKey: "loan_id",
})

LoanInstallment.belongsTo(Loan, {
  foreignKey: "loan_id",
})

module.exports = {
  RBSetting,
  CASetting,
  LoanSetting,
  Reimbursement,
  CashAdvance,
  Loan,
  LoanInstallment
}