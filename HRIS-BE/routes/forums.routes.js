const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
  createPost,
  getPost,
} = require("../controllers/ForumsController");

router.get("/forums/all", isAuth, getPost);
router.post("/forums", isAuth, createPost);

module.exports = router;
