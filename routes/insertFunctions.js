import { pool } from '../db/connection.js';
import inquirer from 'inquirer';

export async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the new department? ',
    },
  ]);
  try {
    const res = await pool.query('INSERT INTO department (name) VALUES ($1)', [answers.departmentName]);
    console.log('Added '+ [answers.departmentName] + ' to the database.');
  } catch (err) {
    console.error(err);
  }
}

export async function addRole() {
  try {
    //Need to lookup departments for picker
    const existingDepts = await pool.query('SELECT id, name FROM department');
    const departments = existingDepts.rows;
    const departmentChoices = departments.map(dept => ({
      name: dept.name,
      value: dept.id
    }));
  
} catch (err) {
      console.error(err);
  };
  
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter the name of the role: ',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for the role? ',
    },
    //need to add a picker for the existing departments...poop
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the new role:',
      choices: departmentChoices,
    },
  ]);
  try {
    const res = await pool.query('INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)', [answers.roleName, answers.salary, answers.departmentId]);
    console.log('Role added:');
  } catch (err) {
    console.error(err);
  }
}

export async function addEmployee() {
 //Picker for roles
 try {
  const existingRoles = await pool.query('SELECT id, title FROM role');
  const roles = existingRoles.rows;
  const roleChoices = roles.map(singleRole => ({
    name: singleRole.title,
    value: singleRole.id
  }));

} catch (err) {
    console.error(err);
};

 //picker for managers
 try {
  const existingMgrs = await pool.query(`
    SELECT employee.first_name, employee.last_name, employee.role_id
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    WHERE role.title = 'Manager';
  `); 
  const managers = existingMgrs.rows;
  const mgrChoices = managers.map(singleMgr => ({
    name: singleMgr.first_name +' '+ singleMgr.last_name,
    value: singleMgr.id
  }));

} catch (err) {
    console.error(err);
};

 
 
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:',
    },
    {
      type: 'list',
      name: 'roleName',
      message: 'What is the employees role? ',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'managerName',
      message: 'Who is the employees manager? ',
      choices: mgrChoices,
    },
  ]);
  try {
    const res = await pool.query('INSERT INTO employee (first_name, last_name, roleName, managerName) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.roleName, answers.managerName]);
    console.log('Employee added:');
  } catch (err) {
    console.error(err);
  }
}

export async function updateEmployeeRole() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee whose role you want to update:',
    },
    {
      type: 'input',
      name: 'newRoleId',
      message: 'Enter the new role ID for the employee:',
    },
  ]);
  try {
    const res = await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.newRoleId, answers.employeeId]);
    console.log('Employee role updated:');
  } catch (err) {
    console.error(err);
  }
}