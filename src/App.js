import './App.css';
import { Route, Routes } from "react-router-dom";
import LandingPages from './Pages/LandingPages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPages />}></Route>
    </Routes>
  );
}

export default App;
