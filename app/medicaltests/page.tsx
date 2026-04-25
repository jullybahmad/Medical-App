import { pool } from "@/lib/db";
import ExportButtons from "./ExportButtons";

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
            <tbody>
                {result.rows.map((row: any, i: number) => (
                <tr key={i}>
                    <td>{row.name}</td>
                    <td>{row.category}</td>
                    <td>{row.unit}</td>
                    <td>{row.normalmin.toLocaleString()}</td>
                    <td>{row.normalmax.toLocaleString()}</td>
                </tr>
            ))}
</tbody>
          </tbody>
        </table>
      </div>
    </div>
  );
}