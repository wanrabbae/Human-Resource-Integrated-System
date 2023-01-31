const express = require("express");
const router = express.Router();
const Multer = require("multer");
const AttendanceController = require("../controllers/AttendanceController.js");
const AuthController = require("../controllers/AuthController.js");
const RecruitmentController = require("../controllers/RecruitmentController.js");
const ApplicantController = require("../controllers/ApplicantController.js");
const JobController = require("../controllers/JobController.js");
const OrganizationController = require("../controllers/OrganizationController.js");
const EmployeeController = require("../controllers/EmployeeController.js");
const QualificationController = require("../controllers/QualificationController.js");
const Nationalities = require("../controllers/Nasionalities.js");
const BrandController = require("../controllers/ethos/BrandController.js");
const GaleryController = require("../controllers/ethos/GaleryController.js");
const SourceController = require("../controllers/ethos/SourceController.js");
const WorkTypeController = require("../controllers/ethos/WorkTypeController.js");
const UserEthosController = require("../controllers/ethos/UserEthosController.js");
const ProfitAndCostController = require("../controllers/ProfitAndCostController");
const GIController = require("../controllers/GIController");
const TimeController = require("../controllers/TimeController.js");
const ProfileController = require("../controllers/ProfileController.js");
const WorkSkillController = require("../controllers/WorkSkillController.js");
const EventController = require("../controllers/EventController.js");
const MyTodoController = require("../controllers/MyTodoController.js");
const WorkExperienceController = require("../controllers/WorkExperienceController.js");
const WorkLicenseController = require("../controllers/WorkLicenseController.js");
const WorkLanguageController = require("../controllers/WorkLanguageController.js");
const WorkEducationController = require("../controllers/WorkEducationController.js");
const FileController = require("../controllers/FileController.js");
const DocumentController = require("../controllers/DocumentController.js");
const ReportToController = require("../controllers/ReportToController.js");
const NotifController = require("../controllers/NotifController.js");
const { isAuth, isSubsDiary } = require("../middleware/auth.js");
const { getHistoryDoc } = require("../controllers/RespondentController.js");

const Upload = Multer({ dest: "assets/" });

router.post("/pushNotif", isAuth, NotifController.pushNotif);
router.get("/getDashboardData", isAuth, EmployeeController.getDashboard);
router.get("/current-birthday", isAuth, EmployeeController.getCurrentBirthday);

// Authentication
router.post("/checkLogin", AuthController.checkLogin);
router.post("/forgotPassword", AuthController.forgetPassword);
router.post("/maintainance", isAuth, AuthController.maintainance);

// admin - qualification
router.get("/getSkill", isAuth, QualificationController.getSkill);
router.post("/addSkill", isAuth, QualificationController.addSkill);
router.post("/updateSkill", isAuth, QualificationController.updateSkill);
router.get("/deleteSkill", isAuth, QualificationController.deleteSkill);

router.get("/getEducation", isAuth, QualificationController.getEducation);
router.post("/addEducation", isAuth, QualificationController.addEducation);
router.post(
  "/updateEducation",
  isAuth,
  QualificationController.updateEducation
);
router.get("/deleteEducation", isAuth, QualificationController.deleteEducation);

router.get("/getLicense", isAuth, QualificationController.getLicense);
router.post(
  "/addLicense",
  isAuth,
  Upload.fields([{ name: "attachment" }]),
  QualificationController.addLicense
);
router.post(
  "/updateLicense",
  isAuth,
  Upload.fields([{ name: "attachment" }]),
  QualificationController.updateLicense
);
router.get("/deleteLicense", isAuth, QualificationController.deleteLicense);

router.get("/getLanguage", isAuth, QualificationController.getLanguage);
router.post("/addLanguage", isAuth, QualificationController.addLanguage);
router.post("/updateLanguage", isAuth, QualificationController.updateLanguage);
router.get("/deleteLanguage", isAuth, QualificationController.deleteLanguage);

router.get("/getMembership", isAuth, QualificationController.getMembership);
router.post("/addMembership", isAuth, QualificationController.addMembership);
router.post(
  "/updateMembership",
  isAuth,
  QualificationController.updateMembership
);
router.get(
  "/deleteMembership",
  isAuth,
  QualificationController.deleteMembership
);

// admin - organization
router.get(
  "/getCompanyLocation",
  isAuth,
  OrganizationController.getCompanyLocation
);
router.post(
  "/addCompanyLocation",
  isAuth,
  OrganizationController.addCompanyLocation
);
router.post(
  "/updateCompanyLocation",
  isAuth,
  OrganizationController.updateCompanyLocation
);
router.get(
  "/deleteCompanyLocation",
  isAuth,
  OrganizationController.deleteCompanyLocation
);

router.get(
  "/getCodeStructure",
  isAuth,
  OrganizationController.getCodeStructure
);
router.get("/getStructure", isAuth, OrganizationController.getStructure);
router.post("/addStructure", isAuth, OrganizationController.addStructure);
router.post("/updateStructure", isAuth, OrganizationController.updateStructure);
router.get("/deleteStructure", isAuth, OrganizationController.deleteStructure);

router.get(
  "/getRecruitmentById",
  isAuth,
  RecruitmentController.getRecruitmentById
);
router.get("/getRecruitment", isAuth, RecruitmentController.getRecruitment);
router.post(
  "/getRecruitmentFilter",
  isAuth,
  RecruitmentController.getRecruitmentFilter
);
router.post("/addRecruitment", isAuth, RecruitmentController.addRecruitment);
router.get(
  "/deleteRecruitment",
  isAuth,
  RecruitmentController.deleteRecruitment
);
router.post(
  "/updateRecruitment",
  isAuth,
  RecruitmentController.updateRecruitment
);
router.post(
  "/repostRecruitment",
  isAuth,
  RecruitmentController.repostRecruitment
);

// Admin -> Job
router.post("/bulkUploadJob", isAuth, JobController.bulkUploadJob);
router.post("/bulkUploadJobGrade", isAuth, JobController.bulkUploadJobGrade);
router.post("/bulkUploadJobLevel", isAuth, JobController.bulkUploadJobLevel);
router.post("/bulkUploadJobTitle", isAuth, JobController.bulkUploadJobTitle);
router.post(
  "/bulkUploadJobPosition",
  isAuth,
  JobController.bulkUploadJobPosition
);

router.get("/getJobTitle", isAuth, JobController.getJobTitle);
router.post("/addJobTitle", isAuth, JobController.addJobTitle);
router.get("/deleteJobTitle", isAuth, JobController.deleteJobTitle);
router.post("/updateJobTitle", isAuth, JobController.updateJobTitle);

router.get("/getJobGrade", isAuth, JobController.getJobGrade);
router.post("/addJobGrade", isAuth, JobController.addJobGrade);
router.get("/deleteJobGrade", isAuth, JobController.deleteJobGrade);
router.post("/updateJobGrade", isAuth, JobController.updateJobGrade);

router.get("/getEmployeeStatus", isAuth, JobController.getEmployeeStatus);
router.post("/addEmployeeStatus", isAuth, JobController.addEmployeeStatus);
router.get("/deleteEmployeeStatus", isAuth, JobController.deleteEmployeeStatus);
router.post(
  "/updateEmployeeStatus",
  isAuth,
  JobController.updateEmployeeStatus
);

router.get("/getJobLevel", isAuth, JobController.getJobLevel); // job level
router.post("/addJobLevel", isAuth, JobController.addJobLevel); // job level
router.get("/deleteJobLevel", isAuth, JobController.deleteJobLevel); // job level
router.post("/updateJobLevel", isAuth, JobController.updateJobLevel); // job level

router.get("/getWorkShift", isAuth, JobController.getWorkShift);
router.post("/addWorkShift", isAuth, JobController.addWorkShift);
router.get("/deleteWorkShift", isAuth, JobController.deleteWorkShift);
router.post("/updateWorkShift", isAuth, JobController.updateWorkShift);

router.get("/getJobPosition", isAuth, JobController.getJobPosition);
router.get(
  "/jobposition/:id/employee",
  isAuth,
  JobController.getJobPositionByIdWithEmployee
);
router.post("/addJobPosition", isAuth, JobController.addJobPosition);
router.get("/deleteJobPosition", isAuth, JobController.deleteJobPosition);
router.post("/updateJobPosition", isAuth, JobController.updateJobPosition);

router.get("/getProfit", isAuth, ProfitAndCostController.getProfit);
router.post("/addProfit", isAuth, ProfitAndCostController.addProfit);
router.get("/deleteProfit", isAuth, ProfitAndCostController.deleteProfit);
router.post("/updateProfit", isAuth, ProfitAndCostController.updateProfit);

router.get("/getCost", isAuth, ProfitAndCostController.getCost);
router.post("/addCost", isAuth, ProfitAndCostController.addCost);
router.get("/deleteCost", isAuth, ProfitAndCostController.deleteCost);
router.post("/updateCost", isAuth, ProfitAndCostController.updateCost);

// admin - general information
router.get("/getInfo", isAuth, GIController.getInfo);
router.post(
  "/updateInfo",
  isAuth,
  Upload.single("image2"),
  GIController.updateInfo
);

router.post(
  "/addApplicant",
  Upload.fields([
    { name: "applicantFile" },
    { name: "ktp" },
    { name: "portfolio" },
    { name: "vaccince" },
    { name: "kartuKeluarga" },
    { name: "ijazah" },
    { name: "transkripNilai" },
  ]),
  ApplicantController.addApplicant
);
router.post(
  "/getApplicantByRecruitment",
  ApplicantController.getApplicantByRecruitment
);
router.get("/getApplicant", isAuth, ApplicantController.getApplicant);
router.get("/getCountApplicant", isAuth, ApplicantController.getCountApplicant);
router.get(
  "/getApplicantArchive",
  isAuth,
  ApplicantController.getApplicantArchive
);
router.post(
  "/getApplicantFilter",
  isAuth,
  ApplicantController.getApplicantFilter
);
router.post(
  "/getApplicantByDate",
  isAuth,
  ApplicantController.getApplicantByDate
);

// Admin -> Nasionalites
router.get("/getNationalities", isAuth, Nationalities.getNationalities);
router.post("/addNationalities", isAuth, Nationalities.addNationalities);
router.get("/deleteNationalities", isAuth, Nationalities.deleteNationalities);
router.post("/updateNationalities", isAuth, Nationalities.updateNationalities);

router.get("/getEmployeeName", isAuth, EmployeeController.getEmployeeName);
router.get("/getEmployee", isAuth, EmployeeController.getEmployee);
router.post("/filterEmployee", isAuth, EmployeeController.filterEmployee);
router.post(
  "/filterEmployeeWithJob",
  isAuth,
  EmployeeController.filterEmployeeWithJob
);
router.post(
  "/importEmployee",
  isAuth,
  isSubsDiary,
  Upload.single("file"),
  EmployeeController.importEmployee
);
router.post(
  "/importJobManagement",
  isAuth,
  isSubsDiary,
  Upload.single("file"),
  EmployeeController.importJobManagement
);
router.post(
  "/bulkImport",
  isAuth,
  isSubsDiary,
  Upload.single("file"),
  EmployeeController.bulkImport
);
router.post(
  "/addEmployee",
  isAuth,
  Upload.single("image"),
  EmployeeController.addEmployee
);
router.get("/deleteEmployee", isAuth, EmployeeController.deleteEmployee);
router.post(
  "/updateEmployee",
  isAuth,
  Upload.single("image"),
  EmployeeController.updateEmployee
);
router.post("/updateProfilePhoto", isAuth, Upload.single("photo"), EmployeeController.updateProfilePhoto)
router.post(
  "/updatePersonalDetail",
  isAuth,
  EmployeeController.updatePersonalDetail
);
router.post(
  "/updateContactDetail",
  isAuth,
  EmployeeController.updateContactDetail
);
// Admin -> Report
router.get("/getReport", isAuth, EmployeeController.getReport);
router.post("/addReport", isAuth, EmployeeController.addReport);
router.get("/deleteReport", isAuth, EmployeeController.deleteReport);
router.post("/updateReport", isAuth, EmployeeController.updateReport);

// Admin -> Report method
router.get("/getReportMethod", isAuth, EmployeeController.getReportMethod);
router.post("/addReportMethod", isAuth, EmployeeController.addReportMethod);
router.get(
  "/deleteReportMethod",
  isAuth,
  EmployeeController.deleteReportMethod
);
router.post(
  "/updateReportMethod",
  isAuth,
  EmployeeController.updateReportMethod
);

// Admin -> Termination Reason
router.get("/getTerminate", isAuth, EmployeeController.getTerminationReason);
router.post("/addTerminate", isAuth, EmployeeController.addTerminationReason);
router.get(
  "/deleteTerminate",
  isAuth,
  EmployeeController.deleteTerminationReason
);
router.post(
  "/updateTerminate",
  isAuth,
  EmployeeController.updateTerminationReason
);

// Time Management -> Schedule
router.get("/getSchedule", isAuth, AttendanceController.getSchedule);
router.get("/getSchedule/:id", isAuth, AttendanceController.getSingleSchedule);
router.post("/addSchedule", isAuth, AttendanceController.addSchedule);
router.put("/updateSchedule/:id", isAuth, AttendanceController.updateSchedule);
router.delete(
  "/deleteSchedule/:id",
  isAuth,
  AttendanceController.deleteSchedule
);

// Time Management -> Employee Records
router.get("/getEmployeeRecord", isAuth, TimeController.getEmployeeRecord);
router.post("/addEmployeeRecord", isAuth, TimeController.addEmployeeRecord);
// router.get("/deleteEmployeeRecord", isAuth, TimeController.deleteEmployeeRecord);
// router.post("/updateEmployeeRecord", isAuth, TimeController.updateEmployeeRecord);

// Time Management -> My Attendance
router.get("/getAttendance", isAuth, AttendanceController.getAttendance);
router.post("/addAttendance", isAuth, AttendanceController.addAttendance);

// Time management -> Calendar (Event)
router.get("/getEvent", isAuth, EventController.getEvent);
router.post("/addEvent", isAuth, EventController.addEvent);
router.get("/deleteEvent", isAuth, EventController.deleteEvent);
router.post("/updateEvent", isAuth, EventController.updateEvent);

// Time management -> Calendar (My To DO)
router.get("/getMyToDo", isAuth, MyTodoController.getMyTodo);
router.post("/addMyToDo", isAuth, MyTodoController.addMyTodo);
router.get("/deleteMyToDo", isAuth, MyTodoController.deleteMyTodo);
router.post("/updateMyToDo", isAuth, MyTodoController.updateMyTodo);

// Stages
router.get("/getStage", isAuth, RecruitmentController.getStage);
router.get("/getStageRange", isAuth, RecruitmentController.getStageRange);
router.post("/getStageFilters", isAuth, RecruitmentController.getStageFilter);
router.post("/addStage", isAuth, RecruitmentController.addStage);
router.post(
  "/updateStatusStage",
  isAuth,
  RecruitmentController.updateStatusStage
);
router.post(
  "/updateStatusApplicant",
  isAuth,
  RecruitmentController.updateStatusApplicant
);
router.post("/sendEmailStage", isAuth, RecruitmentController.sendEmailStage);

// NOTIF
router.get("/getNotif", isAuth, RecruitmentController.getNotif);

// Document Management
router.get("/getDocument", isAuth, DocumentController.getDocument);
router.get("/getHistoryDoc", isAuth, getHistoryDoc);
router.post("/addDocument", isAuth, DocumentController.addDocument);
router.post("/filterDocument", isAuth, DocumentController.filterDocument);
router.get("/deleteDocument", isAuth, DocumentController.deleteDocument);
router.post("/updateDocument", isAuth, DocumentController.updateDocument);
router.get(
  "/document/:id/statisitic",
  isAuth,
  DocumentController.getStatisticDoc
);
router.post("/addDocumentDetail", isAuth, DocumentController.addDocumentDetail);
router.get(
  "/deleteDocumentDetail",
  isAuth,
  DocumentController.deleteDocumentDetail
);
router.post(
  "/updateDocumentDetail",
  isAuth,
  DocumentController.updateDocumentDetail
);

router.post("/addFieldDocument", isAuth, DocumentController.addFieldDocument);
router.get(
  "/deleteFieldDocument",
  isAuth,
  DocumentController.deleteFieldDocument
);
router.post(
  "/updateFieldDocument",
  isAuth,
  DocumentController.updateFieldDocument
);

router.post(
  "/addAnswer",
  isAuth,
  Upload.array("value"),
  DocumentController.addAnswer
);

router.post(
  "/addEmergencyContact",
  isAuth,
  ProfileController.addEmergencyContact
);
router.post("/addDependent", isAuth, ProfileController.addUserDependent);
router.post("/addImmigration", isAuth, ProfileController.addUserImmigration);

router.get("/getReportTo", isAuth, ReportToController.getReportTo);
router.post("/addReportTo", isAuth, ReportToController.addReportTo);
router.get("/deleteReportTo", isAuth, ReportToController.deleteReportTo);
router.post("/updateReportTo", isAuth, ReportToController.updateReportTo);

// USER / AUTH ETHOS
router.post("/ethos/login", UserEthosController.login);
router.get("/ethos/getUsers", UserEthosController.getUsers);
router.post("/ethos/addUsers", UserEthosController.addUsers);
router.post("/ethos/updateUsers", UserEthosController.updateUsers);
router.get("/ethos/deleteUsers", UserEthosController.deleteUsers);

// ETHOS BRANDS
router.get("/ethos/getBrands", BrandController.getBrands);
router.post(
  "/ethos/addBrands",
  Upload.single("image"),
  BrandController.addBrands
);
router.post(
  "/ethos/updateBrands",
  Upload.single("image"),
  BrandController.updateBrands
);
router.get("/ethos/deleteBrands", BrandController.deleteBrands);

// ETHOS GALERY
router.get("/ethos/getGalery", GaleryController.getGalery);
router.post(
  "/ethos/addGalery",
  Upload.single("photo"),
  GaleryController.addGalery
);
router.post(
  "/ethos/updateGalery",
  Upload.single("photo"),
  GaleryController.updateGalery
);
router.get("/ethos/deleteGalery", GaleryController.deleteGalery);

// ETHOS SOURCE
router.get("/ethos/getSource", SourceController.getSource);
router.post("/ethos/addSource", SourceController.addSource);
router.post("/ethos/updateSource", SourceController.updateSource);
router.get("/ethos/deleteSource", SourceController.deleteSource);

// ETHOS JENIS PEKERJAAN
router.get("/ethos/getWorkType", WorkTypeController.getWorkType);
router.post("/ethos/addWorkType", WorkTypeController.addWorkType);
router.post("/ethos/updateWorkType", WorkTypeController.updateWorkType);
router.get("/ethos/deleteWorkType", WorkTypeController.deleteWorkType);

// MOBILE API

router.get("/mobile/events", isAuth, EventController.getEvent);
router.get("/mobile/user/getRecord", isAuth, TimeController.getUserRecord);
router.post(
  "/mobile/user/postRecord",
  isAuth,
  Upload.single("photo"),
  TimeController.postUserRecord
);
router.get(
  "/mobile/user/getAttendances",
  isAuth,
  TimeController.getUserAttendances
);

// FILES
router.get("/mobile/employee/file", isAuth, FileController.getFile);
router.post(
  "/mobile/employee/file",
  isAuth,
  Upload.single("file"),
  FileController.addFile
);
router.delete("/mobile/employee/file", isAuth, FileController.deleteFile);

router.get(
  "/document/:id_document/employee/:id_employee",
  isAuth,
  DocumentController.openDocWithAnswer
);
router.get(
  "/document/answer/:id",
  isAuth,
  DocumentController.getAnswerByIdDetailDoc
);

// EMPLOYEE TERMINATION
router.get("/getEmployeeTerminate", isAuth, EmployeeController.getTerminate);
router.post("/employeeTerminate", isAuth, EmployeeController.terminate);

// EMPLOYEE PAYROLL
router.get(
  "/getEmployeePayroll",
  isAuth,
  EmployeeController.getEmployeePayroll
);
router.post("/employeePayroll", isAuth, EmployeeController.set_payroll);

// MOBILE API PROFILE

router.get(
  "/mobile/employee/document",
  isAuth,
  DocumentController.getEmployeeDocument
);

router.get(
  "/mobile/profile/emergencyContact",
  isAuth,
  ProfileController.getUserEmergencyContact
);
router.get(
  "/mobile/profile/emergencyContact/:id",
  isAuth,
  ProfileController.getUserEmergencyContact
);
router.put(
  "/mobile/profile/emergencyContact",
  isAuth,
  ProfileController.updateEmergencyContact
);
router.delete(
  "/mobile/profile/emergencyContact",
  isAuth,
  ProfileController.deleteEmergencyContact
);

router.get(
  "/mobile/profile/dependent",
  isAuth,
  ProfileController.getUserDependent
);
router.put(
  "/mobile/profile/dependent",
  isAuth,
  ProfileController.updateUserDependent
);
router.delete(
  "/mobile/profile/dependent",
  isAuth,
  ProfileController.deleteUserDependent
);

router.get(
  "/mobile/profile/immigration",
  isAuth,
  ProfileController.getUserImmigration
);
router.put(
  "/mobile/profile/immigration",
  isAuth,
  ProfileController.updateUserImmigration
);
router.delete(
  "/mobile/profile/immigration",
  isAuth,
  ProfileController.deleteUserImmigration
);

router.get("/mobile/profile/skill", isAuth, WorkSkillController.getWorkSkill);
router.post("/mobile/profile/skill", isAuth, WorkSkillController.addWorkSkill);
router.delete(
  "/mobile/profile/skill",
  isAuth,
  WorkSkillController.deleteWorkSkill
);
router.put(
  "/mobile/profile/skill",
  isAuth,
  WorkSkillController.updateWorkSkill
);

router.get(
  "/mobile/profile/experience",
  isAuth,
  WorkExperienceController.getWorkexperience
);
router.post(
  "/mobile/profile/experience",
  isAuth,
  WorkExperienceController.addWorkexperience
);
router.delete(
  "/mobile/profile/experience",
  isAuth,
  WorkExperienceController.deleteWorkexperience
);
router.put(
  "/mobile/profile/experience",
  isAuth,
  WorkExperienceController.updateWorkexperience
);

router.get(
  "/mobile/profile/license",
  isAuth,
  WorkLicenseController.getWorkLicense
);
router.post(
  "/mobile/profile/license",
  isAuth,
  WorkLicenseController.addWorkLicense
);
router.delete(
  "/mobile/profile/license",
  isAuth,
  WorkLicenseController.deleteWorkLicense
);
router.put(
  "/mobile/profile/license",
  isAuth,
  WorkLicenseController.updateWorkLicense
);

router.get(
  "/mobile/profile/language",
  isAuth,
  WorkLanguageController.getWorkLanguage
);
router.post(
  "/mobile/profile/language",
  isAuth,
  WorkLanguageController.addWorkLanguage
);
router.delete(
  "/mobile/profile/language",
  isAuth,
  WorkLanguageController.deleteWorkLanguage
);
router.put(
  "/mobile/profile/language",
  isAuth,
  WorkLanguageController.updateWorkLanguage
);

router.get(
  "/mobile/profile/education",
  isAuth,
  WorkEducationController.getWorkEducation
);
router.post(
  "/mobile/profile/education",
  isAuth,
  WorkEducationController.addWorkEducation
);
router.delete(
  "/mobile/profile/education",
  isAuth,
  WorkEducationController.deleteWorkEducation
);
router.put(
  "/mobile/profile/education",
  isAuth,
  WorkEducationController.updateWorkEducation
);

router.get("/mobile/profile/reportto", isAuth, ReportToController.getReportTo);

module.exports = router;
