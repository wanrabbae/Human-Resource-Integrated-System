const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
    getCompany,
    getTotalDocument,
    getTotalLeave,
    getTotalSchedule,
    getTotalFinance,
    getTodo,
} = require("../controllers/HomeMobileController.js");
const {
    getDateWeek,
} = require("../controllers/TimeController")
// const Multer = require("multer");
router.get("/mobile/employee/company", isAuth, getCompany);
router.get("/mobile/employee/mytodo", isAuth, getTodo);
router.get("/mobile/user/weeklist", isAuth, getDateWeek);
router.get("/mobile/employee/document", isAuth, getTotalDocument);
router.get("/mobile/employee/leave", isAuth, getTotalLeave);
router.get("/mobile/employee/schedule", isAuth, getTotalSchedule);
router.get("/mobile/employee/finance", isAuth, getTotalFinance);

module.exports = router;