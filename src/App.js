import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';
import Dashboard from './Pages/Dashboard';
import Template from './Pages/Administrator/template';
import Home from './Pages/Administrator/Admin/Home';
import Optionals from './Pages/Employee/Configuration/Optionals';
import Recruitment from './Pages/Administrator/Recruitment/recruitment';
import EntryApplication from './Pages/Administrator/Recruitment/entry_application';
import Users from './Pages/Administrator/Admin/Users';

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
      <Route path="/employee/configuration" element={<Template />}>
        <Route index element={<Optionals />} />
      </Route>
    </Routes>
  );
}

export default App;
