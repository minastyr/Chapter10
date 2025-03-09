import { pool } from '../db/connection.js';

const allowedTables = ['department', 'role', 'employee'];

/* export async function viewAll(tableName) {
  if (!allowedTables.includes(tableName)) {
    console.error('Invalid table name');
    return;
  }

  try {
    const res = await pool.query(`SELECT * FROM ${tableName}`);
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  }
} */

  export async function viewDepts() {
    try {
      const res = await pool.query('SELECT * FROM department');
      console.table(res.rows);
    } catch (err) {
      console.error(err);
    }

  } 

  export async function viewRoles() {
    try {
      const res = await pool.query('SELECT * FROM role');
      console.table(res.rows);
    } catch (err) {
      console.error(err);
    }
    
  } 

  export async function viewEmps() {
    try {
      const res = await pool.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as Department, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name 
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department = department.id
        LEFT JOIN employee as manager ON employee.manager_id = manager.role_id
      `);

      console.table(res.rows);
    } catch (err) {
      console.error(err);
    }
    
  } 

