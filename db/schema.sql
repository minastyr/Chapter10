CREATE DATABASE hr;

Create table department (
    id serial primary key,
    name varchar(30) not null
);

Create table employee (
    id serial primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer not null,
    manager_id integer,
    foreign key (manager_id) references employee (id)
);

Create table role (
    id serial primary key,
    title varchar(30) not null,
    salary decimal not null,
    department integer not null,
    foreign key (department) references department (id)
);

