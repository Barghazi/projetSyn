import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PlanifierFormation from "./pages/Planifier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/planifier-formation" element={<PlanifierFormation />} />
      </Routes>
    </Router>
  );
}

export default App;
