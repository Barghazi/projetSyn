import React from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportationLogistique = ({ id }) => {
  
  const exportToExcel = () => {
    fetch(`http://localhost:8000/api/export-logistique/${id}`)
      .then(res => res.json())
      .then(data => {
        const wsData = [
          ["Formation", data.formation.nom],
          [], 
          ["Formateurs"],
          ["Nom", "Email"],
          ...data.formateurs.map(f => [f.nom, f.email]),
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
      });
  };

  const exportToPDF = () => {
    fetch(`http://localhost:8000/api/export-logistique/${id}`)
      .then(res => res.json())
      .then(data => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text(`Formation : ${data.formation.nom}`, 10, 10);

        doc.setFontSize(12);
        doc.text("Formateurs :", 10, 20);
        doc.autoTable({
          startY: 25,
          head: [["Nom", "Email"]],
          body: data.formateurs.map(f => [f.nom, f.email]),
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
