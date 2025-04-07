// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import PlanifierFormation from "./pages/Planifier";
import FormationForm from "./pages/FormationForm"; // Importer le composant FormationForm
import Sidebar from "./pages/Sidebar"; // Importer le composant Sidebar

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Afficher la sidebar sur toutes les pages */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/planifier-formation" element={<PlanifierFormation />} />
            <Route path="/ajouter-formation" element={<FormationForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
