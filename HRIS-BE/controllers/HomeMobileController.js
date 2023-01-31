const Home = require("../models/HomeMobile.js");
const Op = require("sequelize").Op;
const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const {Document} = require("../models/Document.js");
const {JobPosition} = require("../models/JobModels.js");
const {Reimbursement, CashAdvance, Loan} = require("../models/FinanceModels.js");
const Leave = require("../models/Leave.js");
const LeaveType = require("../models/LeaveType.js");
const Schedule = require("../models/Schedule.js");
const Finance = require("../models/Schedule.js");
const Branch = require("../models/Workexperience");
const MyTodo = require("../models/MyTodo");

module.exports.getCompany = async (req, res) => {
  try {
    const data = await Branch.findOne({
      where: {
        employeeId: req.userData.employeeId,
      },
      attributes: ["companyName"]

}); 
    return res.jsonData(data);
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

// GET Todolist
module.exports.getTodo = async (req, res) => {
  try {
    const data = await MyTodo.findAll({
      where: {
        employeeId: req.userData.employeeId,
      },
}); 
    return res.jsonData(data);
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
}

//   Get information

      // Get total document
      module.exports.getTotalDocument = async (req, res) => {
        try {
          const data = await Document.Count({
            where: {
              unique_id: req.userData.unique_id,
            
            },
      }); 
          return res.jsonData(data);
        } catch (error) {
          return res.serverError("Internal server error: " + error.toString());
        }
      }

      // Get total finance submission
        module.exports.getTotalFinance = async (req, res) => {
        try {
          const data = await Home.findAndCountAll({
            where: {
              employeeId: req.userData.employeeId,
            
            },
          include: [{
          model: Employee,
          as: "employee",
          attributes: ["id", "firstName"]
        }, {
          model: Reimbursement,
        }, {
          model: CashAdvance,

        }, {
          model: Loan,
        }
      ]
      }); 
          return res.jsonData(data);
        } catch (error) {
          return res.serverError("Internal server error: " + error.toString());
        }
      }

      // Get leave
  module.exports.getTotalLeave = async (req, res) => {
  try {
    const data = await Leave.findAndCountAll({
      include: [
        { model: LeaveType, as: "leave_type" },
        { model: Employee, as: "employee" },
        { model: JobPosition, as: "jobposition" },
      ],
    });
    return res.jsonData(data);
  } catch (error) {
    return res.serverError("Internal server error: " + error.toString());
  }
};

// GET Schedule
 module.exports.getTotalSchedule = async (req, res) => {
        try {
          const data = await Schedule.findAndCountAll({
            where: {
              employeeId: req.userData.employeeId,
            
            },
              include: [
                {
                  model: Employee,
                  as: "employee",
                  attributes: ["id", "firstName"],
                },
              ]
      }); 
          return res.jsonData(data);
        } catch (error) {
          return res.serverError("Internal server error: " + error.toString());
        }
      }