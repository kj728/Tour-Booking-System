USE TRIPTIDE;
GO
CREATE TABLE bookings(
    id VARCHAR (255) PRIMARY KEY NOT NULL,
    userid VARCHAR (255) NOT NULL,
    tourid VARCHAR (255) NOT NULL,
    hotelid VARCHAR (255) NOT NULL,
    bstartdate VARCHAR (255) NOT NULL,
    benddate VARCHAR (255) NOT NULL,
    bookingdate VARCHAR (255) NOT NULL,
    bguests INT NOT NULL,
    bstatus VARCHAR (255) NOT NULL,
    bEmailSent INT DEFAULT 0,
    isDeleted INT DEFAULT 0,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (tourid) REFERENCES tours(id),
    FOREIGN KEY (hotelid) REFERENCES hotels(id)
);

SELECT * FROM bookings;
