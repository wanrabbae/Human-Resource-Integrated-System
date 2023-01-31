const express = require("express");
const router = express.Router();
const { isAuth, isSuperAdmin } = require("../middleware/auth.js");
const {
  getAdmin,
  getAllAdmin,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  registerAdmin,
} = require("../controllers/AdminController");

router.get("/admin/all", isAuth, isSuperAdmin, getAllAdmin);

router.get("/admin/:id", isAuth, isSuperAdmin, getAdmin);

router.post("/admin", isAuth, isSuperAdmin, addAdmin);

router.put("/admin/:id", isAuth, isSuperAdmin, updateAdmin);

router.delete("/admin/:id", isAuth, isSuperAdmin, deleteAdmin);

router.post("/register/admin", registerAdmin);

module.exports = router;
