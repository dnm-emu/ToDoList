import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Reg from "./pages/Reg";
import TaskTrecker from "./pages/TaskTrecker";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/reg" element={<Reg />} />
        
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskTrecker />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;