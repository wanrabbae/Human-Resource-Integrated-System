const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const { getAllRole } = require("../controllers/RoleController.js");

router.get("/role/all", isAuth, getAllRole);

module.exports = router;
