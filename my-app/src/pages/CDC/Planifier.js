import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importation de Link
import './styles.css';
import FormationFilter from './FormationFilter'; // Import du composant FormationFilter
// Importation des autres composants nécessaires
import { useNavigate } from 'react-router-dom';

const Planifier = () => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [filters, setFilters] = useState({ filiere: '', dateDebut: '', dateFin: '' });
  const [selectedFormations, setSelectedFormations] = useState([]); // Sélection des formations

  useEffect(() => {
    fetch('http://localhost:8000/api/formations')
      .then((response) => response.json())
      .then((data) => {
        setFormations(data);
        setFilteredFormations(data);
      })
      .catch((error) => console.error('Erreur lors du chargement des formations', error));
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    const filtered = formations.filter((formation) => {
      const dateDebutCheck = filters.dateDebut
        ? formation.date_debut >= filters.dateDebut
        : true;
      const dateFinCheck = filters.dateFin
        ? formation.date_fin <= filters.dateFin
        : true;

      const filiereCheck = filters.filiere
        ? formation.titre && formation.titre.toUpperCase().includes(filters.filiere.toUpperCase())
        : true;

      return dateDebutCheck && dateFinCheck && filiereCheck;
    });
    setFilteredFormations(filtered);
  };
  const navigate = useNavigate();
  const handleCheckboxChange = (id) => {
    setSelectedFormations([id]); // Une seule sélection
    navigate(`/affecter-formateurs/${id}`); // Redirection vers la page des formateurs
   
  };
  

  const handleSubmit = () => {
    if (selectedFormations.length > 0) {
      console.log('Formations sélectionnées:', selectedFormations);
    } else {
      alert('Veuillez sélectionner une formation');
    }
  };

  return (
    <div className="layout">
      

      <div className="main-content">
        {/* Affichage des filtres et du tableau */}
        <FormationFilter 
          filters={filters} 
          handleFilterChange={handleFilterChange} 
          applyFilters={applyFilters} 
        />

        {/* <button onClick={handleSubmit}>Soumettre les formations sélectionnées</button> */}

        <table border="1">
          <thead>
            <tr>
              <th></th>
              <th>Titre</th>
              <th>Description</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Formateur</th>
              <th>Site</th>
              <th>Mode</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredFormations.length > 0 ? (
              filteredFormations.map((formation) => (
                <tr key={formation.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFormations.includes(formation.id)}
                      onChange={() => handleCheckboxChange(formation.id)}
                    />
                  </td>
                  <td>{formation.titre}</td>
                  <td>{formation.description}</td>
                  <td>{formation.date_debut_formatted}</td>
                  <td>{formation.date_fin_formatted}</td>
                  <td>{formation.formateur_animateur}</td>
                  <td>{formation.site_de_formation}</td>
                  <td>{formation.mode_de_formation}</td>
                  <td>{formation.statut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">Aucune formation disponible</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Planifier;
