const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "TheLaughTrack123!!",
  database: "managementDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});

function promptUser() {
  inquirer
    .prompt({
      name: "userChoice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Remove Employee",
        "Update Employee Role",
        "View All Roles",
        "View All Departments",
        "Exit",
      ],
    })
    .then(function (response) {
      switch (response.userChoice) {
        case "View all Employees":
          readEmployees();
          break;
        case "View all Employees by Department":
          readByDepartment();
          break;
        case "View all Employees by Manager":
          readByManager();
          break;
        case "Add Employee":
          createEmployee();
          break;
        case "Add Role":
          createRole();
          break;
        case "Add Department":
          createDepartment();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          readRoles();
          break;
        case "View All Departments":
          readAllDepartments();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
  function readEmployees() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department
    FROM employee
    LEFT JOIN employee_role ON employee.role_id = employee_role.id 
    INNER JOIN department ON employee_role.department_id = department.id;`;
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }
  function readRoles() {
    let query = `SELECT employee_role.id,  employee_role.title, employee_role.salary, department.name AS department
    FROM employee_role
    LEFT JOIN department ON employee_role.department_id = department.id;`;
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }
  function readAllDepartments() {
    let query = `SELECT department.id, department.name AS department
    FROM department;`;
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }
  function readByDepartment() {
    let query = `SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
    FROM employee
    LEFT JOIN employee_role ON employee.role_id = employee_role.id 
    INNER JOIN department ON employee_role.department_id = department.id
    ORDER BY department.name;`;
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }
  function readByManager() {
    let query = `SELECT One.id , One.first_name, One.last_name, CONCAT (Two.first_name, ' ', Two.last_name) AS manager
    FROM employee One, employee Two
    WHERE One.manager_id = Two.id
    ORDER BY manager;`;
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }

  function createEmployee() {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role_id",
          type: "input",
          message: "What the employee's role id number?",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Who is the employee's manager id number?",
        },
      ])
      .then(function (res) {
        connection.query(`INSERT INTO employee SET ?`, res, (err) => {
          if (err) throw err;
          console.log("successfully added!");
          promptUser();
        });
      });
  }
  function createRole() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the new role?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "department_id",
          type: "input",
          message: "What is the department id of this role.",
        },
      ])
      .then(function (res) {
        connection.query(`INSERT INTO employee_role SET ?`, res, (err) => {
          if (err) throw err;
          console.log("successfully added!");
          promptUser();
        });
      });
  }
  function createDepartment() {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What's the name of the new department.",
        },
      ])
      .then(function (res) {
        connection.query(`INSERT INTO department SET ?`, res, (err) => {
          if (err) throw err;
          console.log("successfully added!");
          promptUser();
        });
      });
  }
}
