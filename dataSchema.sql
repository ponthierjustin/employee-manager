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
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (role_id) REFERENCES employee_role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
INSERT INTO department (id, name)
VALUES (1, "Development"),(2, "Sales"),(3, "Finance");

INSERT INTO employee_role ( title, salary, department_id)
VALUES ("Engineer", 75000, 1),("Sales Lead", 60000, 2),("Accountant", 100000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Justin", "Ponthier", 1), ( "Jamey", "Gronewald", 2), ("Kaleb", "Garrison", 3);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;

SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary, employee_role.department_id, department.name 
FROM employee
LEFT JOIN employee_role ON employee.role_id = employee_role.id
INNER JOIN department ON employee_role.department_id = department.id;