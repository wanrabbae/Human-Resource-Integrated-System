const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
    getPermissions,
    addPermissions,
    updatePermissions,
    deletePermissions,
    getSinglePermission,
} = require("../controllers/PermissionsController.js");

router.get("/permissions/all", isAuth, getPermissions);
router.get("/permissions/:id", isAuth, getSinglePermission);
router.post("/permissions", isAuth, addPermissions);
router.put("/permissions/:id", isAuth, updatePermissions);
router.delete("/permissions/:id", isAuth, deletePermissions);

module.exports = router;