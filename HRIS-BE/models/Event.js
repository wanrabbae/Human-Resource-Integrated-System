const Sequelize = require("sequelize");
const db = require("../config/database.js");

const Event = db.define(
  "events",
  {
    // Define attributes
    title: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    location: Sequelize.STRING,
    calendar: Sequelize.STRING,
    time: Sequelize.STRING,
    details: Sequelize.STRING,
    employeeId: Sequelize.STRING,
    category: Sequelize.STRING, // note: event or mytodo
    unique_id: Sequelize.STRING,
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

// Export model Product
module.exports = Event;
