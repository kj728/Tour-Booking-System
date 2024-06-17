USE TRIPTIDE;
GO

CREATE TABLE users
(
    id VARCHAR (255) PRIMARY KEY NOT NULL,
    username VARCHAR (255) NOT NULL,
    uemail VARCHAR (255) UNIQUE NOT NULL,
    upassword VARCHAR (255) NOT NULL,
    isEmailSentNewUser INT DEFAULT 0,
    isAdmin INT DEFAULT 0,
    isDeleted INT DEFAULT 0
);

SELECT * FROM users;

-- DROP TABLE Users

