const Sequelize = require("sequelize");
const Applicant = require("./Applicant.js");
const Employee = require("./Employee.js");
const Leave = require("./Leave.js");
const db = require("../config/database.js");

const Inbox = db.define(
  "inboxes",
  {
    title: Sequelize.STRING,
    message: Sequelize.TEXT,
    link: Sequelize.STRING,
    employeeId: Sequelize.INTEGER,
    toEmployee: Sequelize.INTEGER,
    applicant_id: Sequelize.INTEGER,
    type: Sequelize.STRING,
    notified_at: Sequelize.DATE,
    time: Sequelize.TIME,
    otherId: Sequelize.INTEGER,
    isRead: Sequelize.BOOLEAN,
    unique_id: Sequelize.STRING,
  },
  {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false,
  }
);

Applicant.associate = (models) => {
  Applicant.hasOne(Inbox, {
    foreignKey: "applicant_id",
  });
};

Inbox.belongsTo(Employee, {
    foreignKey: "toEmployee",
    as: "employee"
})

Inbox.belongsTo(Leave, {
  foreignKey: "otherId",
  as: "leave"
})

// Export model Product
module.exports = Inbox;
