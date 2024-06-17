USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE addBooking(
    @id VARCHAR (255),
    @userid VARCHAR (255),
    @tourid VARCHAR (255),
    @hotelid VARCHAR (255),
    @bstartdate VARCHAR (255),
    @benddate VARCHAR (255),
    @bookingdate VARCHAR (255),
    @bguests VARCHAR (255),
    @bstatus VARCHAR (255),
    @bEmailSent VARCHAR (255)
)
AS
BEGIN
    INSERT INTO bookings(id,userid,tourid,hotelid,bstartdate,benddate,bookingdate,bguests,bstatus,bEmailSent)
    VALUES (@id,@userid,@tourid,@hotelid,@bstartdate,@benddate,@bookingdate,@bguests,@bstatus,@bEmailSent)
END