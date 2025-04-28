import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './stylelogistique.css';

const GestionLogistique = () => {
  const { id } = useParams(); // Récupérer l'ID de la formation
  const navigate = useNavigate();  // Hook pour la navigation
  const [logistiqueData, setLogistiqueData] = useState({
    hebergement: '',
    transport: '',
    autres_details: '',
  });
  const [hebergementOptions, setHebergementOptions] = useState([]);
  const [transportOptions, setTransportOptions] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Récupérer les options pour l'hébergement et le transport
  useEffect(() => {
    fetch('http://localhost:8000/api/hebergement-options')
      .then((res) => res.json())
      .then((data) => setHebergementOptions(data))
      .catch((err) => console.error('Erreur hébergement :', err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/api/transport-options')
      .then((res) => res.json())
      .then((data) => setTransportOptions(data))
      .catch((err) => console.error('Erreur transport :', err));
  }, []);

  // Charger les données de la logistique
  useEffect(() => {
    fetch(`http://localhost:8000/api/logistique/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setLogistiqueData({
            hebergement: data.hebergement || '',
            transport: data.transport || '',
            autres_details: data.autres_details || '',
          });
        }
      })
      .catch((err) => console.error('Erreur logistique :', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogistiqueData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier que les données sont correctes avant l'envoi
    if (!logistiqueData.hebergement || !logistiqueData.transport) {
      alert("Veuillez remplir tous les champs requis !");
      return;
    }

    // Requête PUT pour mettre à jour la logistique
    fetch(`http://localhost:8000/api/logistique/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formation_id: id,
        ...logistiqueData,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Problème lors de la mise à jour');
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.message === 'Logistique mise à jour avec succès !') {
          setShowConfirmation(true);
          // Naviguer vers la page ExportationLogistique après une mise à jour réussie
          navigate(`/logistique/export/${id}`);
        } else {
          setShowConfirmation(false);
          alert('Problème lors de la mise à jour de la logistique');
        }
      })
      .catch((err) => {
        console.error('Erreur:', err);
        setShowConfirmation(false);
        alert('Erreur lors de la mise à jour de la logistique');
      });
  };

  return (
    <div className="gestion-logistique-container">
      <h2 className="title">Gestion Hébergement et Logistique</h2>

      <form onSubmit={handleSubmit}>
        <div className="logistique-field">
          <label className="logistique-label">Hébergement :</label>
          <select
            name="hebergement"
            value={logistiqueData.hebergement}
            onChange={handleChange}
            className="logistique-input"
          >
            <option value="">-- Sélectionner un hébergement --</option>
            {hebergementOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="logistique-field">
          <label className="logistique-label">Transport :</label>
          <select
            name="transport"
            value={logistiqueData.transport}
            onChange={handleChange}
            className="logistique-input"
          >
            <option value="">-- Sélectionner un moyen de transport --</option>
            {transportOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="logistique-field">
          <label className="logistique-label">Autres détails :</label>
          <textarea
            name="autres_details"
            value={logistiqueData.autres_details}
            onChange={handleChange}
            className="logistique-input"
          />
        </div>

        <button type="submit" className="btn-submit">Valider la logistique</button>
      </form>

      {showConfirmation && (
        <div className="confirmation-message">
          <p className="success-text">✅ Logistique mise à jour avec succès !</p>
        </div>
      )}
    </div>
  );
};

export default GestionLogistique;
