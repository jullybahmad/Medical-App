import { pool } from "@/lib/db";

export default async function TestPage() {
  const result = await pool.query("SELECT NOW()");

  return (
    <div>
      <h1>Database Connected ✅</h1>
      <p>{result.rows[0].now.toString()}</p>
    </div>
  );
}