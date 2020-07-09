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
      choices: ["View all Employees"],
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
    connection.query("SELECT * FROM employee", function (err, res) {
      console.table(res);
    });
  }
}
