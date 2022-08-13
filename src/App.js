import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';
import Dashboard from './Pages/Dashboard';
import Template from './Pages/Administrator/template';
import Home from './Pages/Administrator/Admin/Home';
import Optionals from './Pages/Employee/Configuration/Optionals';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/dashboard" element={<Template />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/administration" element={<Template />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/employee/configuration" element={<Template />}>
        <Route index element={<Optionals />} />
      </Route>
    </Routes>
  );
}

export default App;
