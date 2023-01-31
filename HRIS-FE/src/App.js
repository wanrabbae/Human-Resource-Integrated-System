import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPages from "./Pages/LandingPages/Home";
import Dashboard from "./Pages/Administrator/Dashboard";
import Template from "./Pages/Administrator/template";
import Home from "./Pages/Administrator/Admin/Home";
import Optionals from "./Pages/Administrator/Employee/Configuration/Optionals";
import Recruitment from "./Pages/Administrator/Recruitment/recruitment";
import EntryApplication from "./Pages/Administrator/Recruitment/entry_application";
// import Users from './Pages/Administrator/Admin/Users';
import CustomField from "./Pages/Administrator/Employee/Configuration/CustomField";
import Users from "./Pages/Administrator/Admin/UserManagement/Users";
import EmployeeStatus from "./Pages/Administrator/Admin/Job/EmployeeStatus";
import JobCategories from "./Pages/Administrator/Admin/Job/JobCategories";
import ProfileTemplate from "./Pages/Administrator/Profile/profile_template";
import ProfileEmployeeTemplate from "./Pages/Administrator/ProfileEmployee/ProfileEmployeeTemplate";
import DataImport from "./Pages/Administrator/Employee/Configuration/DataImport";
import ReportingMethods from "./Pages/Administrator/Employee/Configuration/ReportingMethods";
import TerminationReasons from "./Pages/Administrator/Employee/Configuration/TerminationReasons";
import EmployeeList from "./Pages/Administrator/Employee/Configuration/EmployeeList";
import WorkShift from "./Pages/Administrator/Admin/Job/WorkShift";
import GeneralInformation from "./Pages/Administrator/Admin/Organization/General";
import Locations from "./Pages/Administrator/Admin/Organization/Locations";
import CostProfit from "./Pages/Administrator/Admin/Organization/CostProfit";
import StructureOrganization from "./Pages/Administrator/Admin/Organization/StructureOrganization";
import Report from "./Pages/Administrator/Employee/Configuration/Report";
import DetailReport from "./Pages/Administrator/Employee/Configuration/DetailReport";
import Skills from "./Pages/Administrator/Admin/Qualification/Skills";
import Educations from "./Pages/Administrator/Admin/Qualification/Educations";
import License from "./Pages/Administrator/Admin/Qualification/License";
import Languages from "./Pages/Administrator/Admin/Qualification/Languages";
import Membership from "./Pages/Administrator/Admin/Qualification/Membership";
import Nationalities from "./Pages/Administrator/Admin/Nationalities";
import Feature from "./Pages/LandingPages/Feature";
import DocumentManagement from "./Pages/Administrator/Document/document_management";
import Pricing from "./Pages/LandingPages/Pricing";
import MyAttendance from "./Pages/Administrator/TimeManagement/MyAttendance";
import EmployeeRecord from "./Pages/Administrator/TimeManagement/EmployeeRecord";
import Schedule from "./Pages/Administrator/TimeManagement/Schedule";
import Register from "./Pages/LandingPages/Register";
import Inbox from "./Pages/Administrator/Inbox/Inbox";
import DetailInbox from "./Pages/Administrator/Inbox/DetailInbox";
import DetailApplicant from "./Pages/Administrator/Recruitment/detail_applicant";
import AllStages from "./Pages/Administrator/Recruitment/all_stages";
import DetailStage from "./Pages/Administrator/Recruitment/detail_stage";
import RecruitmentSet from "./Pages/Administrator/Recruitment/recruitment_setting";
import RecruitmentCreate from "./Pages/Administrator/Recruitment/recruitment_create";
import ArchiveApplicant from "./Pages/Administrator/Recruitment/archive_applicant";
import RecruitmentEdit from "./Pages/Administrator/Recruitment/recruitment_edit.js";
import JobManagement from "./Pages/Administrator/Admin/Job/JobManagement";
import BulkUploud from "./Pages/Administrator/Admin/Job/BulkUploud";
import ChartStructure from "./Pages/Administrator/Admin/Organization/ChartStructure";
import Calendar from "./Pages/Administrator/TimeManagement/Calendar";
import Cal from "./Pages/Administrator/TimeManagement/Calendar";
import Maintenance from "./Pages/Administrator/Maintenance/maintenance";
import DetailDocument from "./Pages/Administrator/Document/detail_document";
import DetailDocumentAnswer from "./Pages/Administrator/Document/detail_answer";
import Login from "./Pages/Login";
import Finance from "./Pages/Administrator/Finance/Finance";
import Reimbursment from "./Pages/Administrator/Finance/Reimbursment";
import CashAdvance from "./Pages/Administrator/Finance/CashAdvance";
import Loan from "./Pages/Administrator/Finance/Loan";
import FinanceSetting from "./Pages/Administrator/Finance/FinanceSetting/FinanceSetting";
import DetailLoan from "./Pages/Administrator/Finance/DetailLoan";
import Payroll from "./Pages/Administrator/Payroll/Payroll";
import PayrollComponent from "./Pages/Administrator/Payroll/PayrollComponent";
import TimeOff from "./Pages/Administrator/TimeManagement/TimeOff";
import Leave from "./Pages/Administrator/TimeManagement/TimeOffComponent/Leave";
import Permission from "./Pages/Administrator/TimeManagement/TimeOffComponent/Permission";
import Overtime from "./Pages/Administrator/TimeManagement/TimeOffComponent/Overtime";
import PayrollComponentBulkUpload from "./Pages/Administrator/Payroll/PayrollComponentBulkUpload";
import LeaveSetting from "./Pages/Administrator/TimeManagement/TimeOffComponent/LeaveSetting";
import RunPayroll from "./Pages/Administrator/Payroll/RunPayroll";
import DocumentAnswer from "./Pages/Administrator/Document/document_answer";
import AnswerStatistic from "./Pages/Administrator/Document/answer_statistic";
import PayrollHistory from "./Pages/Administrator/Payroll/PayrollHistory";
import PayrollSettingTemplate from "./Pages/Administrator/Payroll/PayrollSetting/PayrollSettingTemplate";
import Subsidiary from "./Pages/Administrator/Admin/Subsidiary/Subsidiary";
import SubsidiaryDetail from "./Pages/Administrator/Admin/Subsidiary/SubsidiaryDetail";
import SubsidiaryAdd from "./Pages/Administrator/Admin/Subsidiary/SubsidiaryAdd";
import SubsidiaryEdit from "./Pages/Administrator/Admin/Subsidiary/SubsidiaryEdit";
import TemplateApprovalList from "./Pages/Administrator/Inbox/ApprovalList/TemplateApprovalList";
import News from "./Pages/Administrator/News/News";
import AddNews from "./Pages/Administrator/News/AddNews";
import EditNews from "./Pages/Administrator/News/EditNews";
import DetailNews from "./Pages/Administrator/News/DetailNews";

function App() {
  var data = JSON.parse(window.localStorage.getItem("users"));

  return (
    <Routes>
      {/* <Route path="/" element={<Login />}></Route> */}
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/feature" element={<Feature />}></Route>
      <Route path="/pricing" element={<Pricing />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Template />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/news" element={<Template />}>
        <Route index element={<News />} />
        <Route path="/news/add" element={<AddNews />} />
        <Route path="/news/edit/:id" element={<EditNews />} />
        <Route path="/news/detail/:id" element={<DetailNews />} />
      </Route>
      <Route path="/inbox" element={<Template />}>
        <Route index element={<Inbox />} />
        <Route path="/inbox/detail" element={<DetailInbox />} />
        <Route path="/inbox/approval-list" element={<TemplateApprovalList />} />
      </Route>
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/admin" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="/admin/userManagement/users" element={<Users />} />
          <Route path="/admin/job/jobManagement" element={<JobManagement />} />
          {/* <Route path="/admin/job/jobGrade" element={<JobGrade />} /> */}
          <Route
            path="/admin/job/employeeStatus"
            element={<EmployeeStatus />}
          />
          <Route path="/admin/job/jobCategories" element={<JobCategories />} />
          <Route path="/admin/job/workShift" element={<WorkShift />} />
          <Route
            path="/admin/job/jobManagement/bulkUploud"
            element={<BulkUploud />}
          />
          <Route
            path="/admin/document-management"
            element={<DocumentManagement />}
          />
          <Route
            path="/admin/organization/generalInformation"
            element={<GeneralInformation />}
          />
          <Route path="/admin/organization/locations" element={<Locations />} />
          <Route
            path="/admin/organization/costProfit"
            element={<CostProfit />}
          />
          <Route
            path="/admin/organization/structureOrganization"
            element={<StructureOrganization />}
          />
          <Route
            path="/admin/organization/ChartStructureOrganization"
            element={<ChartStructure />}
          />
          <Route path="/admin/qualifications/skills" element={<Skills />} />
          <Route
            path="/admin/qualifications/educations"
            element={<Educations />}
          />
          <Route path="/admin/qualifications/license" element={<License />} />
          <Route
            path="/admin/qualifications/languages"
            element={<Languages />}
          />
          <Route
            path="/admin/qualifications/membership"
            element={<Membership />}
          />
          <Route path="/admin/nationalities" element={<Nationalities />} />
        </Route>
      ) : (
        ""
      )}
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/admin/subsidiary" element={<Template />}>
          <Route path="/admin/subsidiary" element={<Subsidiary />} />
          <Route path="/admin/subsidiary/detail" element={<SubsidiaryDetail />} />
          <Route path="/admin/subsidiary/add" element={<SubsidiaryAdd />} />
          <Route path="/admin/subsidiary/edit" element={<SubsidiaryEdit />} />
        </Route>
      ) : (
        ""
      )}
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/payroll" element={<Template />}>
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll/payroll-history" element={<PayrollHistory />} />
          <Route path="/payroll/payroll-setting" element={<PayrollSettingTemplate />} />
          <Route path="/payroll/run-payroll" element={<RunPayroll />} />
          <Route path="/payroll/payroll-component" element={<PayrollComponent />} />
          <Route path="/payroll/payroll-component/bulk-upload" element={<PayrollComponentBulkUpload />} />

        </Route>
      ) : (
        ""
      )}
      {/* {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? ( */}
        <Route path="/finance" element={<Template />}>
          <Route path="/finance" element={<Finance />} />
          <Route path="/finance/reimburstment" element={<Reimbursment />} />
          <Route path="/finance/cash-advance" element={<CashAdvance />} />
          <Route path="/finance/loan" element={<Loan />} />
          <Route path="/finance/detail-loan/:id" element={<DetailLoan />} />
          <Route path="/finance/finance-setting" element={<FinanceSetting />} />
        </Route>
      {/* ) : (
        ""
      )} */}
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/recruitment" element={<Template />}>
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/edit/:id" element={<RecruitmentEdit />} />
          <Route path="/recruitment/create" element={<RecruitmentCreate />} />
          <Route path="/recruitment/setting" element={<RecruitmentSet />} />
          <Route
            path="/recruitment/entry-application"
            element={<EntryApplication />}
          />
          <Route
            path="/recruitment/entry-application/detail-applicant/:applicant_id"
            element={<DetailApplicant />}
          />
          <Route
            path="/recruitment/entry-application/all-stages-recruitment"
            element={<AllStages />}
          />
          <Route
            path="/recruitment/entry-application/all-stages-recruitment/archive-applicant"
            element={<ArchiveApplicant />}
          />
          <Route
            path="/recruitment/entry-application/detail-stage"
            element={<DetailStage />}
          />
        </Route>
      ) : (
        ""
      )}
      <Route path="/profile" element={<Template />}>
        <Route path="/profile" element={<ProfileTemplate />} />
      </Route>
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/profile-employee" element={<Template />}>
          <Route
            path="/profile-employee"
            element={<ProfileEmployeeTemplate />}
          />
        </Route>
      ) : (
        ""
      )}
      <Route path="/document-management" element={<Template />}>
        <Route path="/document-management" element={<DocumentManagement />} />
        <Route
          path="/document-management/detail/:id"
          element={<DetailDocument />}
        />
        <Route
          path="/document-management/detail/:id/answer"
          element={<DocumentAnswer />}
        />
        <Route
          path="/document-management/detail/:id/answer/statistic"
          element={<AnswerStatistic />}
        />
        <Route
          path="/document-management/detail/:id_document/answer/employee/:id_employee"
          element={<DetailDocumentAnswer />}
        />
      </Route>
      <Route path="/timeManagement" element={<Template />}>
        <Route
          path="/timeManagement/attendance/myAttendance"
          element={<MyAttendance />}
        />
        <Route
          path="/timeManagement/attendance/employeeRecord"
          element={<EmployeeRecord />}
        />
        <Route path="/timeManagement/time-off" element={<TimeOff />} />
        <Route path="/timeManagement/time-off/leave" element={<Leave />} />
        <Route path="/timeManagement/time-off/leave-setting" element={<LeaveSetting />} />
        <Route path="/timeManagement/time-off/permission" element={<Permission />} />
        <Route path="/timeManagement/time-off/overtime" element={<Overtime />} />
        <Route path="/timeManagement/schedule" element={<Schedule />} />
        <Route path="/timeManagement/calendar" element={<Cal />} />
      </Route>
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/maintenance" element={<Template />}>
          <Route path="/maintenance" element={<Maintenance />} />
        </Route>
      ) : (
        ""
      )}
      {data?.role == "admin"  || data?.role == "subsdiary" || data?.role == "subadmin" ? (
        <Route path="/employee" element={<Template />}>
          <Route
            path="/employee/optional-field"
            index
            element={<Optionals />}
          />
          <Route
            path="/employee/custom-field"
            index
            element={<CustomField />}
          />
          <Route path="/employee/data-import" index element={<DataImport />} />
          <Route
            path="/employee/reporting-methods"
            index
            element={<ReportingMethods />}
          />
          <Route
            path="/employee/termination-reasons"
            index
            element={<TerminationReasons />}
          />
          <Route
            path="/employee/employee-list"
            index
            element={<EmployeeList />}
          />
          <Route path="/employee/report" index element={<Report />} />
          <Route
            path="/employee/detail-report"
            index
            element={<DetailReport />}
          />
        </Route>
      ) : (
        ""
      )}
    </Routes>
  );
}

export default App;
