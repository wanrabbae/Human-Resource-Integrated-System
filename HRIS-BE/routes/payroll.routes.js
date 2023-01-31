const express = require("express");
const router = express.Router();
const { isAuth, isSubsDiary } = require("../middleware/auth.js");
const {
  // COMPONENT
  addPayrollComponent,
  getAllPayrollComponent,
  updatePayrollComponent,
  deletePayrollComponent,
  // BONUS
  addBonus,
  getBonus,
  getDetailBonus,
  deleteBonus,
  updateBonus,
  // SETTING COMPONENT
  getSettingComponent,
  addSettingComponent,
  updateSettingComponent,
  deleteSettingComponent,
  getSingleSettingComponent,
  // SETTING BPJS
  getSettingBpjs,
  addSettingBpjs,
  getSingleSettingBpjs,
  updateSettingBpjs,
  deleteSettingBpjs,
  // SETTING PTKP
  getSingleSettingPtkp,
  setPtkp,
  getSettingPkp,
  addSettingPkp,
  updateSettingPkp,
  deleteSettingPkp,
  getSingleSettingThp,
  setThp,
  getSingleSettingThr,
  setThr,
  getPayrollHistory,
  importPC,
  getSettingUph,
  addSettingUph,
  updateSettingUph,
  deleteSettingUph,
  getSettingUpUmpk,
  addSettingUpUmpk,
  updateSettingUpUmpk,
  deleteSettingUpUmpk,
} = require("../controllers/PayrollController.js");

// PAYROLL COMPONENT ROUTES
router.get("/payroll-component/all", isAuth, isSubsDiary, getAllPayrollComponent);

router.post("/payroll-component", isAuth, isSubsDiary, addPayrollComponent);

router.put("/payroll-component/:id", isAuth, isSubsDiary, updatePayrollComponent);

router.delete("/payroll-component/:id", isAuth, isSubsDiary, deletePayrollComponent);

router.post("/payroll-component/bulk", isAuth, isSubsDiary, importPC);
// PAYROLL SETTING TAKE HOME PAY
router.get("/payroll/setting/thp", isAuth, isSubsDiary, getSingleSettingThp);
router.post("/payroll/setting/thp/set", isAuth, isSubsDiary, setThp);

// PAYROLL BONUS
router.get("/payroll/bonus/all", isAuth, isSubsDiary, getBonus);
router.get("/payroll/bonus/detail", isAuth, isSubsDiary, getDetailBonus);
router.post("/payroll/bonus/add", isAuth, isSubsDiary, addBonus);
router.put("/payroll/bonus/put", isAuth, isSubsDiary, updateBonus);
router.delete("/payroll/bonus/delete", isAuth, isSubsDiary, deleteBonus);

// PAYROLL SETTING COMPONENT
router.get("/payroll/setting/component/all", isAuth, isSubsDiary, getSettingComponent);
router.get("/payroll/setting/component/:id", isAuth, isSubsDiary, getSingleSettingComponent);
router.post("/payroll/setting/component", isAuth, isSubsDiary, addSettingComponent);
router.put("/payroll/setting/component/:id", isAuth, isSubsDiary, updateSettingComponent);
router.delete("/payroll/setting/component/:id", isAuth, isSubsDiary, deleteSettingComponent);

// PAYROLL SETTING BPJS KK
router.get("/payroll/setting/bpjs/all", isAuth, isSubsDiary, getSettingBpjs);
router.get("/payroll/setting/bpjs/:id", isAuth, isSubsDiary, getSingleSettingBpjs);
router.post("/payroll/setting/bpjs", isAuth, isSubsDiary, addSettingBpjs);
router.put("/payroll/setting/bpjs/:id", isAuth, isSubsDiary, updateSettingBpjs);
router.delete("/payroll/setting/bpjs/:id", isAuth, isSubsDiary, deleteSettingBpjs);

// PAYROLL SETTING THR
router.get("/payroll/setting/thr", isAuth, isSubsDiary, getSingleSettingThr);
router.post("/payroll/setting/thr/set", isAuth, isSubsDiary, setThr);

// PAYROLL SETTING PTKP
router.get("/payroll/setting/ptkp", isAuth, isSubsDiary, getSingleSettingPtkp);
router.post("/payroll/setting/ptkp/set", isAuth, isSubsDiary, setPtkp);

// PAYROLL SETTING PKP
router.get("/payroll/setting/pkp", isAuth, isSubsDiary, getSettingPkp);
router.post("/payroll/setting/pkp", isAuth, isSubsDiary, addSettingPkp);
router.put("/payroll/setting/pkp/:id", isAuth, isSubsDiary, updateSettingPkp);
router.delete("/payroll/setting/pkp/:id", isAuth, isSubsDiary, deleteSettingPkp);

// PAYROLL HITORY
router.get("/payroll/histories", isAuth, isSubsDiary, getPayrollHistory);

// PAYROLL SETTING EMPLOYEE RESIGN

// PAYROLL SETTING EMPLOYEE UPH
router.get("/payroll/setting/uph", isAuth, isSubsDiary, getSettingUph);
router.post("/payroll/setting/uph", isAuth, isSubsDiary, addSettingUph);
router.put("/payroll/setting/uph/:id", isAuth, isSubsDiary, updateSettingUph);
router.delete("/payroll/setting/uph/:id", isAuth, isSubsDiary, deleteSettingUph);

// PAYROLL SETTING EMPLOYEE UP / UMPK
router.get("/payroll/setting/upumpk", isAuth, isSubsDiary, getSettingUpUmpk);
router.post("/payroll/setting/upumpk", isAuth, isSubsDiary, addSettingUpUmpk);
router.put("/payroll/setting/upumpk/:id", isAuth, isSubsDiary, updateSettingUpUmpk);
router.delete("/payroll/setting/upumpk/:id", isAuth, isSubsDiary, deleteSettingUpUmpk);

module.exports = router;
