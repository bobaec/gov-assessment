CREATE DATABASE paint_company;

CREATE TABLE Roles(
    role_id INTEGER PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE Users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    role_id INT REFERENCES Roles(role_id)
);

CREATE TABLE UserRoles (
    user_id INT REFERENCES Users(user_id),
    role_id INT REFERENCES Roles(role_id),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE Paints (
    color VARCHAR(50) PRIMARY KEY NOT NULL,
    quantity INT NOT NULL
);

-- insert roles
INSERT INTO Roles (role_id, role_name) VALUES 
(1, 'administrator'),
(2, 'manager'),
(3, 'painter');

-- insert users
INSERT INTO Users (user_name, user_email, user_password, role_id) VALUES 
('Adam', 'adam@gmail.com', '1', 1),
('Jane', 'jane@gmail.com', '1', 2),
('John', 'john@gmail.com', '1', 3);

-- insert user roles
INSERT INTO UserRoles (user_id, role_id) VALUES 
(1, 1),
(2, 2),
(3, 3);

-- insert paints
INSERT INTO Paints (color, quantity) VALUES 
('Blue', 10),
('Grey', 10),
('Black', 10),
('White', 10),
('Purple', 10);