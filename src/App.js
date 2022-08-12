import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';
import Dashboard from './Pages/Dashboard';
import Template from './Pages/Administrator/template';
import Home from './Pages/Administrator/Admin/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/administration" element={<Template />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
