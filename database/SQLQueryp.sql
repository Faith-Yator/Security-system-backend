CREATE DATABASE security;

USE security;

CREATE TABLE Newslater(
Newslaterid VARCHAR(250) ,
Name VARCHAR(250)NOT NULL,
Email VARCHAR(250)NOT NULL,
PRIMARY KEY(Newslaterid))


SELECT*FROM Newslater

CREATE TABLE ContactUs(
FirstName VARCHAR(250)NOT NULL,
LastName VARCHAR(250)NOT NULL,
PhoneNumber VARCHAR(250)NOT NULL,
Email VARCHAR(250)NOT NULL,
Location VARCHAR(250)NOT NULL ,
Contactusid VARCHAR(250)NOT NULL,
PRIMARY KEY(Contactusid)
);
SELECT *FROM ContactUs



CREATE TABLE Popup(
Popupid VARCHAR(250)NOT NULL,
Message VARCHAR(250)NOT NULL,
Location VARCHAR(250)NOT NULL,
PRIMARY KEY(Popupid)
)

SELECT *FROM Popup


CREATE TABLE SignIn(
UserName VARCHAR(250)NOT NULL,
Password VARCHAR(250)NOT NULL,
Roles VARCHAR(250)NOT NULL,
PRIMARY KEY(UserName))

SELECT * FROM SignIn