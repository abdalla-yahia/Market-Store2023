/* Replace with your SQL commands */
CREATE TABLE users (
    id serial primary key,
    email varchar(100) unique NOT NULL, 
    user_name varchar(100) NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    password varchar(50) NOT NULL
);