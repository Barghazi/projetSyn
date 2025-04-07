import React, { useState } from 'react';
import './styleForm.css';

const FormationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    dateDebut: '',
    dateFin: '',
    formateur: '',
    site: '',
    mode: '',
    statut: '',
    lien: '' // Champ pour le lien
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Passer les données du formulaire au parent
    setFormData({ // Réinitialiser le formulaire après soumission
      titre: '',
      description: '',
      dateDebut: '',
      dateFin: '',
      formateur: '',
      site: '',
      mode: '',
      statut: '',
      lien: ''
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
          name="dateDebut"
          value={formData.dateDebut}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Date fin</label>
        <input
          type="date"
          name="dateFin"
          value={formData.dateFin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Formateur</label>
        <input
          type="text"
          name="formateur"
          value={formData.formateur}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Site</label>
        <input
          type="text"
          name="site"
          value={formData.site}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Mode</label>
        <select
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionner...</option>
          <option value="présentiel">Présentiel</option>
          <option value="distance">Distance</option>
          <option value="hybride">Hybride</option>
        </select>
      </div>

      {(formData.mode === 'hybride' || formData.mode === 'distance') && (
        <div className="form-group">
          <label>Entrez le lien de la formation</label>
          <input
            type="url"
            name="lien"
            value={formData.lien}
            onChange={handleChange}
            placeholder="https://votre-lien.com"
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
