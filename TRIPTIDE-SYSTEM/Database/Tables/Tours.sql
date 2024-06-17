USE TRIPTIDE;
GO

CREATE TABLE tours

(
    id VARCHAR (255)PRIMARY KEY NOT NULL,
    tourname VARCHAR (255) NOT NULL,
    tdestination VARCHAR (255) NOT NULL,
    tdescription VARCHAR (255) NOT NULL,
    tprice INT NOT NULL,
    isDeleted INT DEFAULT 0
);


SELECT * FROM tours