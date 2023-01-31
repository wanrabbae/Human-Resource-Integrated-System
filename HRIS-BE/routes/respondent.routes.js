const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
  getAllRespondent,
  addRespondent,
  deleteRespondent,
  updateRespondent,
} = require("../controllers/RespondentController");

router.get("/respondents/all", isAuth, getAllRespondent);
router.post("/respondents", isAuth, addRespondent);
router.put("/respondents/:id", isAuth, updateRespondent);
router.delete("/respondents/:id", isAuth, deleteRespondent);

module.exports = router;
