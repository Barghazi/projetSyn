import React from 'react';
import './styles.css';  // Assure-toi d'importer ton fichier CSS ici

const FormationFilter = ({ filters, handleFilterChange, applyFilters }) => {
  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="filiere">Filière :</label>
        <input
          type="text"
          id="filiere"
          name="filiere"
          placeholder="Filière"
          value={filters.filiere}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="dateDebut">Date début :</label>
        <input
          type="date"
          id="dateDebut"
          name="dateDebut"
          value={filters.dateDebut}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="dateFin">Date fin :</label>
        <input
          type="date"
          id="dateFin"
          name="dateFin"
          value={filters.dateFin}
          onChange={handleFilterChange}
        />
      </div>

      <button className="filter-button" onClick={applyFilters}>Filtrer</button>
    </div>
  );
};

export default FormationFilter;
