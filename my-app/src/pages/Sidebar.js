// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Système de Gestion des Formations</h2>
      <ul>
        <li><Link to="/planifier-formation">Accueil</Link></li>
        <li><Link to="/ajouter-formation">Ajouter formation</Link></li>
        <li><Link to="/gestion-formations">Gestion des formations</Link></li>
        <li><Link to="/gestion-absences">Gestion des absences</Link></li>
        <li><Link to="/gestion-logistique">Gestion logistique</Link></li>
        <li><Link to="/gestion-documentaire">Gestion documentaire</Link></li>
        <li><Link to="/rapports-analyses">Rapports et analyses</Link></li>
        <li><Link to="/suivi-formateurs">Suivi des formateurs</Link></li>
        <li><Link to="/evaluation-formations">Évaluation des formations</Link></li>
        <li><Link to="/gestion-utilisateurs">Gestion des utilisateurs</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
