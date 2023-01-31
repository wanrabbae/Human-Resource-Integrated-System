const express = require("express");
const router = express.Router();
const { isAuth, isSubsDiary } = require("../middleware/auth.js");
const {
    getAllRespondent,
    updateRespondent,
    recapDataTime,
    updateStatusTimes,
    updateStatusFinances,
    recapData,
} = require("../controllers/ApprovalController.js");

// APPROVAL FINANCES
router.get("/finances", isAuth, recapData);
router.put("/finance/status", isAuth, updateStatusFinances);

// APPROVAL DOCUMENT MGMNT
router.get("/respondents/all", isAuth, getAllRespondent);
router.put("/respondents/:id", isAuth, updateRespondent);

// APPROVAL TIME MGMNT
router.get("/time-approval/all", isAuth, recapDataTime);
router.put("/time-approval/status", isAuth, updateStatusTimes);

module.exports = router;