const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
    getNews,
    addNews,
    updateNews,
    deleteNews,
    getSingleNews,
} = require("../controllers/NewsController.js");
const Multer = require("multer");

const Upload = Multer({ dest: "assets/" });

router.get("/news/all", isAuth, getNews);
router.get("/news/:id", isAuth, getSingleNews);
router.post("/news", isAuth, Upload.single("image"), addNews);
router.put("/news/:id", isAuth, Upload.single("image"), updateNews);
router.delete("/news/:id", isAuth, deleteNews);

module.exports = router;