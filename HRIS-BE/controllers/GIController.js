const path = require("path");
const fs = require("fs");
const G_I = require("../models/GeneralInformation");
const Employee = require("../models/Employee");
const { Op } = require("sequelize");

module.exports.getInfo = async (req, res) => {
  try {
    const data = await G_I.findOne({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
        ],
      },
      raw: true,
      nest: true,
    });
    const rec = await Employee.count({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
    });
    if (data) {
      if (data.image == null || data.image == '' || data.image == undefined || data.image == "") {
        data.image = null;
      } else {
        data.image = `${req.protocol}://${req.get("host")}/assets/ethos/${
          data.image
        }`;
      }
      data.countEmployee = rec;
    }
    res.status(200).json({
      status: 200,
      result: data,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error: " + err.toString(),
      error: err,
    });
  }
};

module.exports.updateInfo = async (req, res) => {
  try {
    const find = await G_I.findOne({
      where: {
        [Op.or]: [
          {
            unique_id: req.userData.unique_id,
          },
          {
             
          },
        ],
      },
      raw: true,
      nest: true,
    });
    let imageName = find ? find.image : "";

    if (req.file) {
      fs.unlink(`assets/ethos/${find.image}`, (err) => {
        if (err) throw err;
        console.log("path/file.txt was deleted");
      });
      const tempPath = req.file.path;
      imageName = req.file.filename + "." + req.file.mimetype.split("/")[1];
      const targetPath = path.join(`assets/ethos/${imageName}`);
      fs.rename(tempPath, targetPath, (err) => {
        if (err) return handleError(err, res);
      });
    }

    if (!find || find == null) {
      const create = await G_I.create({
        organization_name: req.body.organization_name,
        register_number: req.body.register_number,
        tax_id: req.body.tax_id,
        phone: req.body.phone,
        fax: req.body.fax,
        email: req.body.email,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        province: req.body.province,
        postal_code: req.body.postal_code,
        country: req.body.country,
        notes: req.body.notes,
        image: imageName,
        unique_id: req.userData.unique_id,
      });
    } else {
      const data = await G_I.update(
        {
          organization_name: req.body.organization_name,
          register_number: req.body.register_number,
          tax_id: req.body.tax_id,
          phone: req.body.phone,
          fax: req.body.fax,
          email: req.body.email,
          address_1: req.body.address_1,
          address_2: req.body.address_2,
          city: req.body.city,
          province: req.body.province,
          postal_code: req.body.postal_code,
          country: req.body.country,
          notes: req.body.notes,
          image: imageName,
        },
        { where: { id: find.id } }
      );
    }

    res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: err,
    });
  }
};
