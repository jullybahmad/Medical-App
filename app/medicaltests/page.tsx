import ExportButtons from "./ExportButtons";
import { pool } from "@/lib/db";

export default async function MedicalTestsPage() {
  const result = await pool.query(`
    SELECT mt.name, 
           tc.name AS category, 
           u.name AS unit, 
           mt.normalmin, 
           mt.normalmax
    FROM medicaltests mt
    JOIN testcategories tc ON mt.idcategory = tc.id
    JOIN uom u ON mt.iduom = u.id
  `);

  return (
    <div className="page-bg">
      <div className="card">
        <div className="header">
          <h1>🧪 Medical Test Dashboard</h1>
          <p>Monitor and manage laboratory test values</p>
        </div>

        <ExportButtons data={result.rows} />

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>

          <tbody>
            {result.rows.map((row: any, i: number) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.category}</td>
                <td>{row.unit}</td>
                <td>{Number(row.normalmin).toLocaleString()}</td>
                <td>{Number(row.normalmax).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}