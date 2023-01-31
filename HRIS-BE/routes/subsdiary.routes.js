const express = require("express");
const router = express.Router();
const { isAuth, isSubAdmin } = require("../middleware/auth.js");
const {
  getSubsdiary,
  deleteSubsdiary,
  addSubsdiary,
  updateSubsdiary,
  getDashboard,
  getJob,
  getAttendance,
  getCodeStructure,
  getStructure,
} = require("../controllers/SubsdiaryController");
const Multer = require("multer");
const Upload = Multer({ dest: "assets/" });

// Subsdiary Dashboard
router.get("/subsdiary/dashboard", isAuth, isSubAdmin, getDashboard);
// Subsdiary Job
router.get("/subsdiary/job", isAuth, isSubAdmin, getJob);
// Subsdiary ORG Structure
router.get(
  "/subsdiary/codeStructure",
  isAuth,
  getCodeStructure
);
router.get("/subsdiary/structure", isAuth, getStructure);
// Subsdiary Attendance
router.get("/subsdiary/attendance", isAuth, isSubAdmin, getAttendance);

router.get("/subsdiary/all", isAuth, isSubAdmin, getSubsdiary);

router.get("/subsdiary/:id", isAuth, isSubAdmin, getSubsdiary);

router.post(
  "/subsdiary",
  isAuth,
  isSubAdmin,
  Upload.single("logo"),
  addSubsdiary
);

router.put(
  "/subsdiary/:id",
  isAuth,
  isSubAdmin,
  Upload.single("logo"),
  updateSubsdiary
);

router.delete("/subsdiary/:id", isAuth, isSubAdmin, deleteSubsdiary);

module.exports = router;
