const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const Employee = require("../models/Employee.js");

exports.isAuth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    console.log(decoded);
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized. silahkan login terlebih dahulu",
      });
    }

    const find = await User.findOne({
      where: {
        id: decoded.userId,
      },
      include: {
        model: Employee,
        attributes: ["id", "firstName"],
      },
      raw: true,
      nest: true,
    });

    req.user = decoded.userId;
    req.userData = find;
    next();
  });
};

exports.isSuperAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  if (req.userData) {
    if (req.userData.role_id == 1) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  if (req.userData) {
    if (req.userData.role_id == 2) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized, only admin can access this!",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized, only admin can access this!",
    });
  }
};

exports.isSubAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
  if (req.userData) {
    if (req.userData.role_id == 3 || req.userData.role_id == 2) {
      next();
    } else {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized, only subadmin and admin can access this!",
      });
    }
  } else {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized, only subadmin and admin can access this!",
    });
  }
};

exports.isSubsDiary = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }

  if (req.userData) {
    if (
      req.userData.role_id == 4 ||
      req.userData.role_id == 3 ||
      req.userData.role_id == 2
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
