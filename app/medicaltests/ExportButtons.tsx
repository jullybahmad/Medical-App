"use client";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function ExportButtons({ data }: { data: any[] }) {
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "MedicalTests");
    XLSX.writeFile(wb, "medical-tests.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [["Name", "Category", "Unit", "Min", "Max"]],
      body: data.map((d) => [
        d.name,
        d.category,
        d.unit,
        d.normalmin,
        d.normalmax,
      ]),
    });

    doc.save("medical-tests.pdf");
  };

  return (
    <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      <button
        onClick={exportExcel}
        style={{
           background: "linear-gradient(135deg, #2563eb, #3b82f6)",
           color: "white",
           padding: "10px 18px",
           border: "none",
           borderRadius: "8px",
           cursor: "pointer",
           fontWeight: "600",
           boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        Download Excel
      </button>

      <button
        onClick={exportPDF}
        style={{
          backgroundColor: "#16a34a",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Print PDF
      </button>
    </div>
  );
}