const Role = require("../models/Role.js");
const { Op } = require("sequelize");

const getAllRole = async (req, res) => {
  try {
    let result;
    if (req.userData.role_id == 1) {
      result = await Role.findAll();
    } else if (req.userData.role_id == 2) {
      result = await Role.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.not]: "superadmin",
              },
            },
            {
              name: {
                [Op.not]: "admin",
              },
            },
          ],
        },
      });
    } else if (req.userData.role_id == 3) {
      result = await Role.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.not]: "superadmin",
              },
            },
            {
              name: {
                [Op.not]: "admin",
              },
            },
            {
              name: {
                [Op.not]: "subadmin",
              },
            },
          ],
        },
      });
    } else if (req.userData.role_id == 4) {
      result = await Role.findAll({
        where: {
          [Op.and]: [
            {
              name: {
                [Op.not]: "superadmin",
              },
            },
            {
              name: {
                [Op.not]: "admin",
              },
            },
            {
              name: {
                [Op.not]: "subadmin",
              },
            },
            {
              name: {
                [Op.not]: "subsdiary",
              },
            },
          ],
        },
      });
    } else {
      result = [];
    }

    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getRole = async (req, res) => {
  try {
    const result = await Role.findByPk(req.params.id);
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addRole = async (req, res) => {
  try {
    const result = await Role.create({
      name: req.body.name,
    });

    return res.jsonSuccessCreated("Success create Role");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteRole = async (req, res) => {
  try {
    const result = await Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Role");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await Role.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Role");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllRole,
  getRole,
  addRole,
  deleteRole,
  updateRole,
};
