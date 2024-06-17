USE TRIPTIDE;
GO

CREATE  TABLE hotels
(
    id VARCHAR (255)PRIMARY KEY NOT NULL,
    hotelname VARCHAR (255) NOT NULL,
    hotellocation VARCHAR (255) NOT NULL,
    hotelrating INT NOT NULL,
    isDeleted INT DEFAULT 0
)

SELECT * FROM hotels