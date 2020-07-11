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
        "View all employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then(function (response) {
      switch (response.userChoice) {
        case "View all Employees":
          readEmployees();
          break;
          case "View all Employees by Department":
          readDepartment();
          break;
          case "View all Employees by Manager":
          readByManager();
          break;
          case "Add Employee":
          createEmployee();
          break;
      }
    });
  function readEmployees() {
    let query =`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
    FROM employee
    LEFT JOIN employee_role ON employee.role_id = employee_role.id 
    INNER JOIN department ON employee_role.department_id = department.id;`
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
   }
   function readDepartment() {
    let query =`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
    FROM employee
    LEFT JOIN employee_role ON employee.role_id = employee_role.id 
    INNER JOIN department ON employee_role.department_id = department.id
    ORDER BY department.name;`
    connection.query(query, function (err, res) {
      console.table(res);
      connection.end();
    });
  }
  function readByManager() {
    let query =`SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
    FROM employee
    LEFT JOIN employee_role ON employee.role_id = employee_role.id 
    INNER JOIN department ON employee_role.department_id = department.id;`
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
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last name?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What the employee's role id?",
    },
    {
      name: "manager_id",
      type: "input",
      message: "Who is the employee's manager id?"
    }])
    .then(function(res){
     connection.query(`INSERT INTO employee SET ?`, res, err => {
       if (err) throw err;
       console.log("successfully added!");
       promptUser();
     })
    }) 
  } 
}
