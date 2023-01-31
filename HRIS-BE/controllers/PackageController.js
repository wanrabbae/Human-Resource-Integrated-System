const Package = require("../models/Package.js");

const getAllPackage = async (req, res) => {
  try {
    const result = await Package.findAll();
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getPackage = async (req, res) => {
  try {
    const result = await Package.findByPk(req.params.id);
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addPackage = async (req, res) => {
  try {
    const result = await Package.create({
      name: req.body.name,
      duration_type: req.body.duration_type,
      duration_number: req.body.duration_number,
      price: req.body.price,
      status: req.body.status,
      max_employee: req.body.max_employee,
      max_subdiary: req.body.max_subdiary,
      max_subadmin: req.body.max_subadmin,
      max_employee_subsdiary: req.body.max_employee_subsdiary,
    });

    return res.jsonSuccessCreated("Success create package");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deletePackage = async (req, res) => {
  try {
    const result = await Package.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete package");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updatePackage = async (req, res) => {
  try {
    const result = await Package.update(
      {
        name: req.body.name,
        duration_type: req.body.duration_type,
        duration_number: req.body.duration_number,
        price: req.body.price,
        status: req.body.status,
        max_employee: req.body.max_employee,
        max_subdiary: req.body.max_subdiary,
        max_subadmin: req.body.max_subadmin,
        max_employee_subsdiary: req.body.max_employee_subsdiary,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update package");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllPackage,
  getPackage,
  addPackage,
  deletePackage,
  updatePackage,
};
