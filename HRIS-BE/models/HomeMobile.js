const Sequelize = require("sequelize");
const db = require("../config/database.js");
const User = require("./User.js");
const {Reimbursement, Loan, CashAdvance} = require("./FinanceModels.js");
const Employee = require("./Employee.js");
const {Document} = require("./Document.js");
const Leave = require("./Leave.js");
const { JobPosition } = require("./JobModels.js");
const Schedule = require("./Schedule.js");
const Branch = require("./Workexperience.js");
const MyTodo = require("./MyTodo.js");

// get employe data
const Home = db.define(
  "home_mobile",
  {
    // Define attributes
    userId: Sequelize.STRING,
    employeeId: Sequelize.STRING,
    jobpositionId: Sequelize.INTEGER,
    unique_id: Sequelize.STRING,
    documentId: Sequelize.INTEGER,
    leaveId: Sequelize.INTEGER,
    schedule_type: Sequelize.INTEGER,
    financeCashAdvanceId: Sequelize.INTEGER,    
    scheduleId: Sequelize.INTEGER,    
    financeReimbursementId: Sequelize.INTEGER,    
    financeLoanId: Sequelize.INTEGER,    
    workexperienceId: Sequelize.INTEGER,    
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

//  relation get employee
User.hasMany(Home);
Home.belongsTo(User);

Employee.hasMany(Home);
Home.belongsTo(Employee);

JobPosition.hasMany(Home);
Home.belongsTo(JobPosition);

Employee.hasMany(User);
User.belongsTo(Employee);

Document.hasMany(Home);
Home.belongsTo(Document);

Reimbursement.hasMany(Home);
Home.belongsTo(Reimbursement);
Loan.hasMany(Home);
Home.belongsTo(Loan);
CashAdvance.hasMany(Home);
Home.belongsTo(CashAdvance);

Leave.hasMany(Home);
Home.belongsTo(Leave);

Schedule.hasMany(Home);
Home.belongsTo(Schedule);
Employee.hasOne(Schedule)
Schedule.belongsTo(Employee)

Branch.hasOne(Home);
Home.belongsTo(Branch);

MyTodo.hasOne(Home);
Home.belongsTo(MyTodo);

module.exports = Home;