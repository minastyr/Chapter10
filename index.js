import express from 'express';
import inquirer from 'inquirer';
import { pool } from './db/connection.js';
import { viewDepts, viewRoles, viewEmps } from './routes/selectFunction.js';
import { addDepartment, addRole, addEmployee, updateEmployeeRole } from './routes/insertFunctions.js';

const router = express.Router();
const marqueeArt = `
*************************************************
*************************************************
                Employee Manager 
*************************************************
*************************************************
`;


console.log(marqueeArt);

async function gotoMain() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: 'What would you like to do today?',
      choices: [
        'view all departments', 
        'view all roles', 
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee', 
        'update an employee role',
        'Exit',
      ],
    },
  ]);

  console.info('Answer:', answers.mainMenu);
  switch (answers.mainMenu) {
    case 'view all departments':
      await viewDepts();
      break;
    case 'view all roles':
      await viewRoles();
      break;
    case 'view all employees':
      await viewEmps();
      break;
    case 'add a department':
      await addDepartment();
      break;
    case 'add a role':
      await addRole();
      break;
    case 'add an employee':
      await addEmployee();
      break;
    case 'update an employee role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log('Thank You and Have a Good Day!');
      process.exit(0);
      break;
  }

  if (answers.mainMenu !== 'Exit') {
    gotoMain();
  }
}

gotoMain();
export default router;