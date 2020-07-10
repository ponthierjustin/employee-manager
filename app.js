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
        "View all Employees by Deprament",
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
          //add function to read data
          readEmployees();
          break;
      }
    });
  function readEmployees() {
    let query =`SELECT id, first_name, last_name, title, salary, department
    FROM employee
    INNER JOIN employee_role USING (id)
    INNER JOIN department USING (id);`
    connection.query(query, function (err, res) {
      console.table(res);
    });
  }
}
