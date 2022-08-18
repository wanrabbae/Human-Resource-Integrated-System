import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/dashboard" element={<Template />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/admin" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="/admin/userManagement/users" element={<Users />} />
        <Route path="/admin/job/jobTitle" element={<JobTitle />} />
        <Route path="/admin/job/jobGrade" element={<JobGrade />} />
        <Route path="/admin/job/employeeStatus" element={<EmployeeStatus />} />
        <Route path="/admin/job/jobCategories" element={<JobCategories />} />
        <Route path="/admin/job/workShift" element={<WorkShift />} />
        <Route path='/admin/recruitment' element={<Recruitment />} />
        <Route path='/admin/recruitment/entry-application' element={<EntryApplication />} />
        <Route path='/admin/profile' element={<ProfileTemplate />} />
        <Route path='/admin/organization/generalInformation' element={<GeneralInformation />} />
        <Route path='/admin/organization/locations' element={<Locations />} />
        <Route path='/admin/organization/costProfit' element={<CostProfit />} />
        <Route path='/admin/organization/structureOrganization' element={<StructureOrganization />} />
      </Route>
      <Route path="/employee" element={<Template />}>
        <Route path="/employee/configuration" index element={<Optionals />} />
        <Route path="/employee/custom" index element={<CustomField />} />
        <Route path="/employee/data-import" index element={<DataImport />} />
        <Route path="/employee/reporting-methods" index element={<ReportingMethods />} />
        <Route path="/employee/termination-reasons" index element={<TerminationReasons />} />
        <Route path="/employee/employee-list" index element={<EmployeeList />} />
      </Route>
    </Routes>
  );
}

export default App;
