const User = require("../models/User.js");
const Role = require("../models/Role.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../config/nodemailer");
const db = require("../config/database");

module.exports.checkLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      include: {
        model: Role,
        as: "roles",
      },
    });
    if (user == null)
      return res.status(400).json({
        status: 404,
        message: "Wrong username or Password",
      });

    if ((user.role_id != 1 || user.role_id != 2) && user.status == "Disable") {
      return res.status(400).json({
        status: 400,
        message: "The platform under maintainance!",
      });
    }

    const hash = req.body.password;
    const check = await bcrypt
      .compare(hash, user.password)
      .then(function (result) {
        return result;
      });
    if (check == false) {
      return res.status(400).json({
        status: 404,
        message: "Wrong username or Password",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return res.send({
      status: 200,
      message: "Success",
      token: token,
      data: {
        id: user.id,
        employeeId: user.employeeId,
        username: user.username,
        role: user.roles.name,
        status: user.status,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Internal server error: " + err.toString(),
    });
  }
};

module.exports.forgetPassword = async (req, res) => {
  try {
    const send = await sendEmail({
      to: req.body.email,
      subject: "Forgot Password",
      message: "<h2>Click link below for change your password</h2>",
    });

    res.status(200).json({
      status: 200,
      message: "Success send email to " + req.body.email,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
};

module.exports.maintainance = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username, role: "admin" },
    });
    if (user == null)
      res.send({
        status: 404,
        message: "Wrong username or Password",
      });
    const hash = req.body.password;
    const check = await bcrypt
      .compare(hash, user.password)
      .then(function (result) {
        return result;
      });
    if (check == false) {
      res.send({
        status: 404,
        message: "Wrong username or Password",
      });
    }

    if (req.body.isMaintain == "true") {
      await db.query("UPDATE users SET status = 'Disable'");
    } else {
      await db.query("UPDATE users SET status = 'Enable'");
    }

    res.status(200).json({
      status: 200,
      message: "Successful",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
