import { pool } from '../db/connection.js';
import inquirer from 'inquirer';


let departmentChoices;

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
  
    console.log(departmentChoices);


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
  let roleChoices = [];
  let mgrChoices = [];

 try {
  const existingRoles = await pool.query('SELECT id, title FROM role');
  const roles = existingRoles.rows;
  roleChoices = roles.map(singleRole => ({
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
  mgrChoices = managers.map(singleMgr => ({
    name: singleMgr.role_id + '   ' + singleMgr.first_name +' '+ singleMgr.last_name,
    value: singleMgr.role_id
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
   
    const res = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.firstName, answers.lastName, answers.roleName, answers.managerName]);
    console.log('Employee added:');
  } catch (err) {
    console.error(err);
  }
}

export async function updateEmployeeRole() {

  let roleChoices = [];
  let empChoices = [];

  try {
    const existingRoles = await pool.query('SELECT id, title FROM role');
    const roles = existingRoles.rows;
    roleChoices = roles.map(singleRole => ({
      name: singleRole.title,
      value: singleRole.id
    }));
  
  } catch (err) {
      console.error(err);
  };

  try {
    const existingEmps = await pool.query('SELECT id, first_name, last_name FROM employee');
    const emps = existingEmps.rows;
    empChoices = emps.map(singleEmp => ({
      name: singleEmp.id + '   ' + singleEmp.first_name + ' ' + singleEmp.last_name,
      value: singleEmp.id
    }));
  
  } catch (err) {
      console.error(err);
  };

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee do you want to update? ',
      choices: empChoices,
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'Which role do you want to assign to the employee?',
      choices: roleChoices,
    },
  ]);
  try {
    const res = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.newRoleId, answers.employeeId]);
    console.log('Employee role updated:');
  } catch (err) {
    console.error(err);
  }
}