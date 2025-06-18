import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/auth";
import Reg from "./pages/Reg";
import TaskTrecker from "./pages/TaskTrecker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskTrecker />} />
        <Route path="/reg" element={<Reg />} />
      </Routes>
    </Router>
  );
}

export default App;
