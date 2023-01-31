const express = require("express");
const router = express.Router();
const { isAuth, isSuperAdmin } = require("../middleware/auth.js");
const {
  getCoupon,
  getAllCoupon,
  addCoupon,
  deleteCoupon,
  updateCoupon,
} = require("../controllers/CouponController");

router.get("/coupon/all", isAuth, isSuperAdmin, getAllCoupon);

router.get("/coupon/:id", isAuth, isSuperAdmin, getCoupon);

router.post("/coupon", isAuth, isSuperAdmin, addCoupon);

router.put("/coupon/:id", isAuth, isSuperAdmin, updateCoupon);

router.delete("/coupon/:id", isAuth, isSuperAdmin, deleteCoupon);

module.exports = router;
