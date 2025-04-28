import React, { useState } from 'react';
import './styleForm.css';
import { useNavigate } from 'react-router-dom';

const FormationForm = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date_debut: '',
    date_fin: '',
    formateur_animateur: '',
    site_de_formation: '',
    mode_de_formation: '',
    lien: '',
    statut: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/formations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de l’envoi');
        return response.json();
      })
      .then(() => {
        alert('Formation ajoutée avec succès !');
        navigate('/planifier-formation');
      })
      .catch((error) => {
        console.error('Erreur :', error);
        alert('Échec de l’ajout de la formation.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulaire de Planification de Formation</h2>

      <div className="form-group">
        <label>Titre</label>
        <input
          type="text"
          name="titre"
          value={formData.titre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="form-group">
        <label>Date début</label>
        <input
          type="date"
          name="date_debut"
          value={formData.date_debut}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date fin</label>
        <input
          type="date"
          name="date_fin"
          value={formData.date_fin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Formateur</label>
        <input
          type="text"
          name="formateur_animateur"
          value={formData.formateur_animateur}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Site</label>
        <input
          type="text"
          name="site_de_formation"
          value={formData.site_de_formation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mode</label>
        <select
          name="mode_de_formation"
          value={formData.mode_de_formation}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner...</option>
          <option value="présentiel">Présentiel</option>
          <option value="distance">Distance</option>
          <option value="hybride">Hybride</option>
        </select>
      </div>

      {(formData.mode_de_formation === 'hybride' ||
        formData.mode_de_formation === 'distance') && (
        <div className="form-group">
          <label>Lien (si en ligne)</label>
          <input
            type="url"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div className="form-group">
        <label>Statut</label>
        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner...</option>
          <option value="valide">Valide</option>
          <option value="redige">Rédigé</option>
          <option value="draft">Brouillon</option>
        </select>
      </div>

      <button type="submit">Soumettre</button>
    </form>
  );
};

export default FormationForm;
