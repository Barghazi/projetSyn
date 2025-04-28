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
        
        
       
      </ul>
    </aside>
  );
};

export default Sidebar;
