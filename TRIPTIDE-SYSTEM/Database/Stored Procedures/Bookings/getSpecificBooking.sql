USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE getSpecificBooking(
    @id VARCHAR (255)
)
AS
BEGIN
    SELECT * FROM bookings WHERE id = @id 
END