const Sequelize = require("sequelize");
const db = require("../config/database.js");
const ReportMethod = require("./ReportMethod.js");

const ReportTo = db.define('reportto', {
    // Define attributes
    name: Sequelize.STRING,
    reporting_method_id: Sequelize.INTEGER,
    status: Sequelize.STRING,
    structureId: Sequelize.STRING,
    employeeId: Sequelize.INTEGER,
    reportToEmployee: Sequelize.INTEGER,
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

}, {
    // Freeze Table Name
    freezeTableName: true,
    timestamps: false
});

ReportMethod.hasMany(ReportTo, {
    foreignKey: "reporting_method_id"
});
ReportTo.belongsTo(ReportMethod, {
    foreignKey: "reporting_method_id"
})

// Export model Product
module.exports = ReportTo;