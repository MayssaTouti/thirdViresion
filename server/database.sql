CREATE DATABASE postgres ; 

CREATE TABLE role (
  role_id SERIAL PRIMARY KEY , 
  role_name VARCHAR(255), 
  role_description VARCHAR(255)
);

 CREATE TABLE utilisateur (
  iduser SERIAL PRIMARY KEY ,
  email VARCHAR(255),
  name VARCHAR(255),
  password VARCHAR(255),
   role_id SERIAL REFERENCES role
);

CREATE TABLE tiers (
  codetier  VARCHAR(255) PRIMARY KEY ,
  type   VARCHAR(255) DEFAULT 'fournisseur' || 'client' ,
  name VARCHAR(255),
  pays VARCHAR(255)
);

CREATE TABLE modele (
  idmodele SERIAL PRIMARY KEY ,
  name VARCHAR(255) NOT NULL,
  idtype SERIAL REFERENCES type ,
  file BYTEA NOT NULL ,
  codetier VARCHAR(255) REFERENCES tiers
);
/*
CREATE TABLE fournisseur (
  codefour VARCHAR(255) PRIMARY KEY ,
  name VARCHAR(255),
  pays VARCHAR(255)

);

CREATE TABLE client (
  codecl VARCHAR(255) PRIMARY KEY ,
  name   VARCHAR(255),
  pays   VARCHAR(255)
);*/
 CREATE TABLE Simple_User (
     id_user SERIAL PRIMARY KEY ,  
    email VARCHAR(255), 
    nom  VARCHAR(255), 
   password VARCHAR(255)
   );

CREATE TABLE type (
  idtype SERIAL PRIMARY KEY ,
  nametype VARCHAR(255) NOT NULL
);