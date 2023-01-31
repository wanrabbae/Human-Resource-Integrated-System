const Admin = require("../models/User");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const { generateUniqueCode } = require("../utilities/generate.js");

const getAllAdmin = async (req, res) => {
  try {
    const result = await Admin.findAll({
      where: {
        role_id: 2,
      },
      include: {
        model: Role,
        as: "roles",
      },
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getAdmin = async (req, res) => {
  try {
    const result = await Admin.findByPk(req.params.id, {
      include: {
        model: Role,
        as: "roles",
      },
    });
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const registerAdmin = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
      return hash;
    });
    const result = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: password,
      role_id: 2,
      parent_role_id: 1,
      phone: req.body.phone,
      package_id: req.body.package_id,
      unique_id: generateUniqueCode(), // important!
    });

    return res.jsonSuccessCreated("Success register Admin");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addAdmin = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 12).then((hash) => {
      return hash;
    });
    const result = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: password,
      role_id: 2,
      parent_role_id: 1,
      phone: req.body.phone,
      package_id: req.body.package_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      unique_id: generateUniqueCode(),
    });

    return res.jsonSuccessCreated("Success create Admin");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const result = await Admin.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Admin");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateAdmin = async (req, res) => {
  try {
    let password;

    if (req.body.password) {
      password = await bcrypt.hash(req.body.password, 12).then((hash) => {
        return hash;
      });
    }

    const result = await Admin.update(
      {
        name: req.body.name,
        username: req.body.username,
        password: password,
        role_id: 2,
        parent_role_id: 2,
        phone: req.body.phone,
        package_id: req.body.package_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Admin");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllAdmin,
  getAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  registerAdmin,
};
