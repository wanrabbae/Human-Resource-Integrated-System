const express = require("express");
const router = express.Router();
const {
  isAuth,
  isSuperAdmin,
  isAdmin,
  isSubAdmin,
  isSubsDiary,
} = require("../middleware/auth.js");
const UserController = require("../controllers/UserController.js");
const Multer = require("multer");

const Upload = Multer({ dest: "assets/" });

router.post("/getImage", UserController.getImage);
router.get("/getUser", isAuth, isSubsDiary, UserController.getUser);
router.post("/addUser", isAuth, isSubsDiary, UserController.addUser);
router.post("/updateUser", isAuth, isSubsDiary, UserController.updateUser);
router.get("/deleteUser", isAuth, isSubsDiary, UserController.deleteUser);
router.post("/filterUser", isAuth, isSubsDiary, UserController.filterUser);

// ADMIN -> MY PROFILE
router.get("/getProfile", isAuth, UserController.getProfile);
router.post("/updateProfile", isAuth, UserController.updateProfile);

// MOBILE
router.get("/mobile/getUserName", isAuth, UserController.getUserData);
router.get("/mobile/profile/personal", isAuth, UserController.getProfile);
router.get("/mobile/profile/job", isAuth, UserController.getUserJob);
router.put(
  "/mobile/profile/job",
  isAuth,
  Upload.single("contractFile"),
  UserController.updateUserJob
);

// GET COMPANY NAME
router.get("/company-name", isAuth, UserController.getCompanyName)

module.exports = router;
