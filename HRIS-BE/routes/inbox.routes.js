const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
  readStatus,
  getInbox,
  getSingleInbox,
  deleteInbox,
} = require("../controllers/InboxController.js");

router.get("/inbox/all", isAuth, getInbox);
router.get("/inbox/:id", isAuth, getSingleInbox);
router.put("/inbox/read", isAuth, readStatus);
router.put("/inbox/delete", isAuth, deleteInbox);

module.exports = router;
