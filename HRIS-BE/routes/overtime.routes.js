const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
    getOvertime,
    addOvertime,
    updateOvertime,
    deleteOvertime,
    getSingleOvertime,
} = require("../controllers/OvertimeController.js");

router.get("/overtime/all", isAuth, getOvertime);
router.get("/overtime/:id", isAuth, getSingleOvertime);
router.post("/overtime", isAuth, addOvertime);
router.put("/overtime/:id", isAuth, updateOvertime);
router.delete("/overtime/:id", isAuth, deleteOvertime);

module.exports = router;