import { pool } from '../db/connection.js';

const allowedTables = ['department', 'role', 'employee'];

export async function viewAll(tableName) {
  if (!allowedTables.includes(tableName)) {
    console.error('Invalid table name');
    return;
  }

  try {
    const res = await pool.query(`SELECT * FROM ${tableName}`);
    console.log(res.rows);
  } catch (err) {
    console.error(err);
  }
}