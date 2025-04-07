import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importation de Link
import './styles.css';
import FormationFilter from './FormationFilter'; // Import du composant FormationFilter
import FormationForm from './FormationForm'; // Import du composant FormationForm

const Planifier = () => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]);
  const [filters, setFilters] = useState({ filiere: '', dateDebut: '', dateFin: '' });
  const [isFormVisible, setIsFormVisible] = useState(false); // État pour afficher/masquer le formulaire
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

      // Vérification de 'filiere' en insensibilité à la casse
      const filiereCheck = filters.filiere
        ? formation.titre && formation.titre.toUpperCase().includes(filters.filiere.toUpperCase())
        : true;

      return dateDebutCheck && dateFinCheck && filiereCheck;
    });
    setFilteredFormations(filtered);
  };

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible); // Permet d'afficher ou de cacher le formulaire
  };

  const handleCheckboxChange = (id) => {
    setSelectedFormations((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((formationId) => formationId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
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
      <aside className="sidebar">
        <h2>Menu</h2>
        <ul>
        <li><Link to="/planifier-formation">Accueil</Link></li>
          <li>
            <Link to="#" onClick={toggleForm}>Ajouter formation</Link>
          </li>
          <li><a href="#">Paramètres</a></li>
        </ul>
      </aside>

      <div className="main-content">
        {/* Affichage conditionnel du formulaire */}
        {isFormVisible ? (
          <FormationForm />
        ) : (
          <>
            {/* Affichage des filtres et du tableau lorsque le formulaire est caché */}
            <FormationFilter 
              filters={filters} 
              handleFilterChange={handleFilterChange} 
              applyFilters={applyFilters} 
            />

            <button onClick={handleSubmit}>Soumettre les formations sélectionnées</button>

            <table border="1">
              <thead>
                <tr>
                  <th></th> {/* Nouvelle colonne pour les cases à cocher */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Planifier;
