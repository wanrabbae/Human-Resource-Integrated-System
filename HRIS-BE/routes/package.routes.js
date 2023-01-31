const express = require("express");
const router = express.Router();
const { isAuth, isSuperAdmin } = require("../middleware/auth.js");
const {
  getPackage,
  getAllPackage,
  addPackage,
  deletePackage,
  updatePackage,
} = require("../controllers/PackageController");

router.get("/package/all", isAuth, isSuperAdmin, getAllPackage);

router.get("/package/:id", isAuth, isSuperAdmin, getPackage);

router.post("/package", isAuth, isSuperAdmin, addPackage);

router.put("/package/:id", isAuth, isSuperAdmin, updatePackage);

router.delete("/package/:id", isAuth, isSuperAdmin, deletePackage);

module.exports = router;
