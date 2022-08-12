import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
