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
import CustomField from './Pages/Employee/Configuration/CustomField';

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
        <Route path='/admin/recruitment' element={<Recruitment />} />
        <Route path='/admin/recruitment/entry-application' element={<EntryApplication />} />
      </Route>
      <Route path="/employee" element={<Template />}>
        <Route  path="/employee/configuration" index element={<Optionals />} />
        <Route  path="/employee/custom" index element={<CustomField />} />
      </Route>
    </Routes>
  );
}

export default App;
