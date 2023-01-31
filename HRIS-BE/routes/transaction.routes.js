const express = require("express");
const router = express.Router();
const { isAuth, isSuperAdmin } = require("../middleware/auth.js");
const {
  getTransaction,
  getAllTransaction,
  addTransaction,
} = require("../controllers/TransactionController");

router.get("/transaction/all", isAuth, isSuperAdmin, getAllTransaction);

router.get("/transaction/:id", isAuth, isSuperAdmin, getTransaction);

router.post("/transaction", isAuth, addTransaction);

module.exports = router;
