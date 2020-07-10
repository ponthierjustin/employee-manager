DROP DATABASE IF EXISTS managementDB;
CREATE database managementDB;

USE managementDB;

CREATE TABLE department (
    id INT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE employee_role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (id, name)
VALUES (1, "Devlopment");

INSERT INTO employee_role (id, title, salary)
VALUES (1, "Engineer", 75000);

INSERT INTO products (id, first_name, last_name)
VALUES (1, "Justin", "Ponthier");

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;