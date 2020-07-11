DROP DATABASE IF EXISTS managementDB;
CREATE database managementDB;

USE managementDB;

CREATE TABLE department (
    id INT auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT  auto_increment,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
   
);

CREATE TABLE employee (
    id INT auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)

);
INSERT INTO department (id, name)
VALUES (1, "Development"),(2, "Sales"),(3, "Finance");

INSERT INTO employee_role ( title, salary, department_id)
VALUES ("Engineer", 75000, 1),("Sales Lead", 60000, 2),("Accountant", 100000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Justin", "Ponthier", 1, 2), ( "Jamey", "Gronewald", 2, 3), ("Kaleb", "Garrison", 3, 1), ("Bob", "Builder", 2, 3), ("Pink", "Guy", 1, null);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
FROM employee
LEFT JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN department ON employee_role.department_id = department.id;

SELECT employee_role.id,  employee_role.title, employee_role.salary, department.name AS department
FROM employee_role
LEFT JOIN department ON employee_role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, department.name AS department, employee.manager_id
FROM employee
LEFT JOIN employee_role ON employee.role_id = employee_role.id 
INNER JOIN department ON employee_role.department_id = department.id
ORDER BY department.name;

SELECT One.id , One.first_name, One.last_name, CONCAT (Two.first_name, ' ', Two.last_name) AS manager
FROM employee One, employee Two
WHERE One.manager_id = Two.id
ORDER BY manager;