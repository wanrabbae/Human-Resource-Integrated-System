const express = require("express");
const router = express.Router();
const { isAuth, isSubsDiary } = require("../middleware/auth.js");
const {
  getLeave,
  getAllLeave,
  addLeave,
  deleteLeave,
  updateLeave,

  getAllLeaveType,
  getLeaveType,
  addLeaveType,
  updateLeaveType,
  deleteLeaveType,
} = require("../controllers/LeaveController");

router.get("/leave/all", isAuth, getAllLeave);
router.get("/leave/:id", isAuth, getLeave);
router.post("/leave", isAuth, addLeave);
router.put("/leave/:id", isAuth, updateLeave);
router.delete("/leave/:id", isAuth, deleteLeave);

router.get("/leave/type/all", isAuth, getAllLeaveType);
router.get("/leave/type/:id", isAuth, getLeaveType);
router.post("/leave/type", isAuth, isSubsDiary, addLeaveType);
router.put("/leave/type/:id", isAuth, isSubsDiary, updateLeaveType);
router.delete("/leave/type/:id", isAuth, isSubsDiary, deleteLeaveType);

module.exports = router;
