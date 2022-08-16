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
import PersonalDetail from './Pages/Administrator/Profile/personal_detail';
import DataImport from './Pages/Administrator/Employee/Configuration/DataImport';

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
        <Route path='/admin/recruitment' element={<Recruitment />} />
        <Route path='/admin/recruitment/entry-application' element={<EntryApplication />} />
        <Route path='/admin/profile' element={<ProfileTemplate />}>
          <Route index element={<PersonalDetail />} />
        </Route>
      </Route>
      <Route path="/employee" element={<Template />}>
        <Route  path="/employee/configuration" index element={<Optionals />} />
        <Route  path="/employee/custom" index element={<CustomField />} />
        <Route  path="/employee/data-import" index element={<DataImport />} />
      </Route>
    </Routes>
  );
}

export default App;
