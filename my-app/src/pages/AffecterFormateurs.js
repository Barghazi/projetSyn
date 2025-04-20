import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // J'ai ajouté useNavigate pour la redirection
import './styleAffecter.css';

const AffecterFormateurs = () => {
  const { formationId } = useParams(); // récupère l'ID depuis l'URL
  const navigate = useNavigate(); // Utilisation de navigate pour la redirection après affectation
  const [formateurs, setFormateurs] = useState([]);
  const [selectedFormateurs, setSelectedFormateurs] = useState([]);
  const [formationNom, setFormationNom] = useState('');  

  // Récupérer les formateurs
  useEffect(() => {
    fetch('http://localhost:8000/api/formateurs') // Vérifie si l'URL est correcte pour récupérer les formateurs
      .then(res => res.json())
      .then(data => setFormateurs(data))
      .catch(err => console.error('Erreur chargement formateurs', err));
  }, []);

  // Récupérer les informations de la formation
  useEffect(() => {
    fetch(`http://localhost:8000/api/formations/${formationId}`)
      .then(res => res.json())
      .then(data => setFormationNom(data.titre)) // adapte 'titre' selon la réponse
      .catch(err => {
        console.error('Erreur lors de la récupération de la formation', err);
      });
  }, [formationId]);

  // Gérer la sélection des formateurs
  const handleCheckboxChange = (id) => {
    setSelectedFormateurs((prev) =>
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  // Gérer l'affectation des formateurs
  const handleAffecterFormateurs = () => {
    if (selectedFormateurs.length === 0) {
      alert("Veuillez sélectionner au moins un formateur à affecter.");
      return;
    }

    // Redirection vers la page Logistique (s'il y a une)
    navigate(`/logistique/${formationId}`, {
      state: { formateurs: selectedFormateurs }
    });

    // Appel API pour affecter les formateurs
    fetch('http://localhost:8000/api/logistique', { // URL de l'API pour affecter des formateurs
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formation_id: formationId,
        formateurs: selectedFormateurs,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert("Formateurs affectés avec succès !");
        console.log(data);
      })
      .catch((err) => {
        console.error("Erreur lors de l'affectation :", err);
        alert("Une erreur est survenue.");
      });
  };

  // Gérer la désaffectation des formateurs
  const handleDeaffecterFormateurs = () => {
    if (selectedFormateurs.length === 0) {
      alert("Veuillez sélectionner au moins un formateur à désaffecter.");
      return;
    }

    // Appel API pour désaffecter les formateurs
    fetch('http://localhost:8000/api/logistique', { // URL de l'API pour désaffecter des formateurs
      method: 'DELETE', // Méthode DELETE pour désaffecter
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formation_id: formationId,
        formateurs: selectedFormateurs,
      }),
    })
      .then(res => res.json())
      .then(data => {
        alert("Formateurs désaffectés avec succès !");
        console.log(data);
      })
      .catch((err) => {
        console.error("Erreur lors de la désaffectation :", err);
        alert("Une erreur est survenue.");
      });
  };

  return (
    <div className="layout">
      <div className="main-content">
        <h2>
          Affecter des formateurs à la formation : <span>{formationNom || formationId}</span>
        </h2>

        <div className="buttons-wrapper">
          <div className="buttons-container">
            <button className="btn affecter" onClick={handleAffecterFormateurs}>
              Affecter
            </button>
            <button className="btn desaffecter" onClick={handleDeaffecterFormateurs}>
              Désaffecter
            </button>
          </div>
        </div>

        <table border="1">
          <thead>
            <tr>
              <th></th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Matricule</th>
              <th>Établissement</th>
              <th>Ville</th>
            </tr>
          </thead>
          <tbody>
            {formateurs.map((formateur) => (
              <tr key={formateur.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(formateur.id)}
                    checked={selectedFormateurs.includes(formateur.id)}
                  />
                </td>
                <td>{formateur.nom}</td>
                <td>{formateur.prenom}</td>
                <td>{formateur.matricule}</td>
                <td>{formateur.etablissement}</td>
                <td>{formateur.site_hebergement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AffecterFormateurs;
