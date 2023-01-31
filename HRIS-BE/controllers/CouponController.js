const Coupon = require("../models/Coupon.js");

const getAllCoupon = async (req, res) => {
  try {
    const result = await Coupon.findAll();
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const getCoupon = async (req, res) => {
  try {
    const result = await Coupon.findByPk(req.params.id);
    return res.jsonData(result);
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const addCoupon = async (req, res) => {
  try {
    const result = await Coupon.create({
      name: req.body.name,
      type: req.body.type,
      referral_code: req.body.referral_code,
      amount: req.body.amount,
      repeat: req.body.repeat,
      status: req.body.status,
    });

    return res.jsonSuccessCreated("Success create Coupon");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const result = await Coupon.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.jsonSuccess("Success delete Coupon");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

const updateCoupon = async (req, res) => {
  try {
    const result = await Coupon.update(
      {
        name: req.body.name,
        type: req.body.type,
        referral_code: req.body.referral_code,
        amount: req.body.amount,
        repeat: req.body.repeat,
        status: req.body.status,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.jsonSuccess("Success update Coupon");
  } catch (err) {
    return res.serverError("Internal server error: " + err.toString());
  }
};

module.exports = {
  getAllCoupon,
  getCoupon,
  addCoupon,
  deleteCoupon,
  updateCoupon,
};
