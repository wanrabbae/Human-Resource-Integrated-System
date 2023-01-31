const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Employee = require("../models/Employee.js");
const Package = require("../models/Package.js")

exports.isSubsDiary = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  if (req.userData) {
    if (req.userData.role_id == 4 || req.userData.role_id == 3 || req.userData.role_id == 2
    ) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message:
          "Unauthorized, only subsdiary, subadmin, and admin can access this!",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message:
        "Unauthorized, only subsdiary, subadmin, and admin can access this!",
    });
  }
};
