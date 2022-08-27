import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages/Home';
import Dashboard from './Pages/Administrator/Dashboard';
import Template from './Pages/Administrator/template';
import Home from './Pages/Administrator/Admin/Home';
import Optionals from './Pages/Administrator/Employee/Configuration/Optionals';
import Recruitment from './Pages/Administrator/Recruitment/recruitment';
import EntryApplication from './Pages/Administrator/Recruitment/entry_application';
// import Users from './Pages/Administrator/Admin/Users';
import CustomField from './Pages/Administrator/Employee/Configuration/CustomField';
import Users from './Pages/Administrator/Admin/UserManagement/Users';
import JobTitle from './Pages/Administrator/Admin/Job/JobTitle';
import JobGrade from './Pages/Administrator/Admin/Job/JobGrade';
import EmployeeStatus from './Pages/Administrator/Admin/Job/EmployeeStatus';
import JobCategories from './Pages/Administrator/Admin/Job/JobCategories';
import ProfileTemplate from './Pages/Administrator/Profile/profile_template';
import DataImport from './Pages/Administrator/Employee/Configuration/DataImport';
import ReportingMethods from './Pages/Administrator/Employee/Configuration/ReportingMethods';
import TerminationReasons from './Pages/Administrator/Employee/Configuration/TerminationReasons';
import EmployeeList from './Pages/Administrator/Employee/Configuration/EmployeeList';
import WorkShift from './Pages/Administrator/Admin/Job/WorkShift';
import GeneralInformation from './Pages/Administrator/Admin/Organization/General';
import Locations from './Pages/Administrator/Admin/Organization/Locations';
import CostProfit from './Pages/Administrator/Admin/Organization/CostProfit';
import StructureOrganization from './Pages/Administrator/Admin/Organization/StructureOrganization';
import Report from './Pages/Administrator/Employee/Configuration/Report';
import DetailReport from './Pages/Administrator/Employee/Configuration/DetailReport';
import Skills from './Pages/Administrator/Admin/Qualification/Skills';
import Educations from './Pages/Administrator/Admin/Qualification/Educations';
import License from './Pages/Administrator/Admin/Qualification/License';
import Languages from './Pages/Administrator/Admin/Qualification/Languages';
import Membership from './Pages/Administrator/Admin/Qualification/Membership';
import Nationalities from './Pages/Administrator/Admin/Nationalities';
import Feature from './Pages/LandingPages/Feature';
import DocumentManagement from './Pages/Administrator/Document/document_management';
import Pricing from './Pages/LandingPages/Pricing';
import MyAttendance from './Pages/Administrator/TimeManagement/MyAttendance';
import EmployeeRecord from './Pages/Administrator/TimeManagement/EmployeeRecord';
import Schedule from './Pages/Administrator/TimeManagement/Schedule';
import Register from './Pages/LandingPages/Register';
import Message from './Pages/Administrator/Dashboard/Message';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/feature" element={<Feature />}></Route>
      <Route path="/pricing" element={<Pricing />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/dashboard" element={<Template />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/message" element={<Template />}>
        <Route index element={<Message />} />
      </Route>
      <Route path="/admin" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="/admin/userManagement/users" element={<Users />} />
        <Route path="/admin/job/jobTitle" element={<JobTitle />} />
        <Route path="/admin/job/jobGrade" element={<JobGrade />} />
        <Route path="/admin/job/employeeStatus" element={<EmployeeStatus />} />
        <Route path="/admin/job/jobCategories" element={<JobCategories />} />
        <Route path="/admin/job/workShift" element={<WorkShift />} />
        <Route path='/admin/document-management' element={<DocumentManagement />} />
        <Route path='/admin/organization/generalInformation' element={<GeneralInformation />} />
        <Route path='/admin/organization/locations' element={<Locations />} />
        <Route path='/admin/organization/costProfit' element={<CostProfit />} />
        <Route path='/admin/organization/structureOrganization' element={<StructureOrganization />} />
        <Route path='/admin/qualifications/skills' element={<Skills />} />
        <Route path='/admin/qualifications/educations' element={<Educations />} />
        <Route path='/admin/qualifications/license' element={<License />} />
        <Route path='/admin/qualifications/languages' element={<Languages />} />
        <Route path='/admin/qualifications/membership' element={<Membership />} />
        <Route path='/admin/nationalities' element={<Nationalities />} />
      </Route>
      <Route path="/recruitment" element={<Template />}>
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/recruitment/entry-application" element={<EntryApplication />} />
      </Route>
      <Route path="/profile" element={<Template />}>
        <Route path="/profile" element={<ProfileTemplate/>} />
      </Route>
      <Route path="/document-management" element={<Template />}>
        <Route path="/document-management" element={<DocumentManagement/>} />
      </Route>
      <Route path="/timeManagement" element={<Template />}>
        <Route path="/timeManagement/attendance/myAttendance" element={<MyAttendance />} />
        <Route path="/timeManagement/attendance/employeeRecord" element={<EmployeeRecord />} />
        <Route path="/timeManagement/schedule" element={<Schedule />} />
      </Route>
      <Route path="/employee" element={<Template />}>
        <Route path="/employee/optional-field" index element={<Optionals />} />
        <Route path="/employee/custom-field" index element={<CustomField />} />
        <Route path="/employee/data-import" index element={<DataImport />} />
        <Route path="/employee/reporting-methods" index element={<ReportingMethods />} />
        <Route path="/employee/termination-reasons" index element={<TerminationReasons />} />
        <Route path="/employee/employee-list" index element={<EmployeeList />} />
        <Route path="/employee/report" index element={<Report />} />
        <Route path="/employee/detail-report" index element={<DetailReport />} />
      </Route>
    </Routes>
  );
}

export default App;
