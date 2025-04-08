// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import PlanifierFormation from "./pages/Planifier";
import FormationForm from "./pages/FormationForm";
import Sidebar from "./pages/Sidebar";

const AppContent = () => {
  const location = useLocation();
  
  // Liste des routes où le sidebar ne doit pas apparaître
  const hideSidebar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />} {/* N'affiche pas la sidebar si on est sur / ou /login */}

      <div className="content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/planifier-formation" element={<PlanifierFormation />} />
          <Route path="/ajouter-formation" element={<FormationForm />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
