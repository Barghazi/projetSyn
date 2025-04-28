import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';

const ExportationLogistique = () => {
  const { id } = useParams(); // Utilisation de useParams pour récupérer l'id de l'URL
  const [selectedFormateurs, setSelectedFormateurs] = useState([]); // Formateurs sélectionnés

  // Fonction pour gérer la sélection des formateurs
  const handleSelectFormateur = (formateurId) => {
    setSelectedFormateurs((prevSelected) => {
      if (prevSelected.includes(formateurId)) {
        return prevSelected.filter((id) => id !== formateurId); // Désélectionner
      } else {
        return [...prevSelected, formateurId]; // Sélectionner
      }
    });
  };

  const exportToExcel = () => {
    fetch(`http://localhost:8000/api/export-logistique/${id}`)
      .then(res => res.json())
      .then(data => {
        // Vérifie que les données nécessaires sont présentes
        if (!data || !data.formation || !data.formateurs || !data.logistique) {
          throw new Error("Données manquantes dans la réponse du serveur.");
        }
  
        // Filtrer les formateurs sélectionnés
        const selectedFormateursData = data.formateurs.filter(formateur =>
          selectedFormateurs.includes(formateur.id)
        );
  
        // Construire les données de la feuille Excel
        const wsData = [
          ["Formation", data.formation.nom],
          [],
          ["Formateurs"],
          ["Nom", "Email"], // Entêtes des colonnes
          ...selectedFormateursData.map(f => [f.nom, f.email]), // Corps des données
          [],
          ["Logistique"],
          ["Hébergement", data.logistique.hebergement],
          ["Transport", data.logistique.transport],
          ["Autres détails", data.logistique.autres_details]
        ];
  
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, "Logistique");
        XLSX.writeFile(wb, `logistique_formation_${id}.xlsx`);
      })
      .catch(error => {
        console.error('Erreur lors de l\'exportation en Excel :', error);
        alert("Erreur lors de l'exportation en Excel : " + error.message);
      });
  };
  
  const exportToPDF = () => {
    fetch(`http://localhost:8000/api/export-logistique/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Erreur serveur : ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Vérifie que les données nécessaires sont présentes
        if (!data || !data.formation || !data.formateurs || !data.logistique) {
          throw new Error("Données manquantes dans la réponse du serveur.");
        }
  
        // Filtrer les formateurs sélectionnés
        const selectedFormateursData = data.formateurs.filter(formateur =>
          selectedFormateurs.includes(formateur.id)
        );
  
        const doc = new jsPDF();
  
        doc.setFontSize(16);
        doc.text(`Formation : ${data.formation.nom}`, 10, 10);
  
        doc.setFontSize(12);
        doc.text("Formateurs :", 10, 20);
        doc.autoTable({
          startY: 25,
          head: [["Nom", "Email"]], // Entêtes des colonnes
          body: selectedFormateursData.map(f => [f.nom, f.email]), // Corps des données
        });
  
        const yAfterTable = doc.lastAutoTable.finalY + 10;
        doc.text("Logistique :", 10, yAfterTable);
  
        doc.autoTable({
          startY: yAfterTable + 5,
          body: [
            ["Hébergement", data.logistique.hebergement],
            ["Transport", data.logistique.transport],
            ["Autres détails", data.logistique.autres_details],
          ],
          theme: "plain",
        });
  
        doc.save(`logistique_formation_${id}.pdf`);
      })
      .catch(error => {
        console.error('Erreur lors de l\'exportation en PDF :', error);
        alert("Erreur lors de l'exportation en PDF : " + error.message);
      });
  };
  
  

  return (
    <div className="exportation-logistique-container">
      <button className="btn-export" onClick={exportToPDF}>Exporter en PDF</button>
      <button className="btn-export" onClick={exportToExcel}>Exporter en Excel</button>
    </div>
  );
};

export default ExportationLogistique;
