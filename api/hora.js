import { Pool } from 'pg';

console.log('Archivo api/hora.js cargado');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Query OK:', result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error en la query:', error);
    res.status(500).send('Error en la conexión');
  }
}