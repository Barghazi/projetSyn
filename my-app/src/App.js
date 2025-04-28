// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/CDC/Login";
import PlanifierFormation from "./pages/CDC/Planifier";
import FormationForm from "./pages/CDC/FormationForm";
import Sidebar from "./pages/CDC/Sidebar";
import AffecterFormateurs from './pages/CDC/AffecterFormateurs';
import GestionLogistique from './pages/CDC/GestionLogistique';
import ExportationLogistique from './pages/CDC/ExportationLogistique';

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
          <Route path="/affecter-formateurs/:formationId" element={<AffecterFormateurs />} />
          <Route path="/logistique/:id" element={<GestionLogistique />} />
          <Route path="/logistique/export/:id" element={<ExportationLogistique />} />
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
