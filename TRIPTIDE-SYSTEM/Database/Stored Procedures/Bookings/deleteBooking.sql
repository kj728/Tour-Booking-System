USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE deleteBooking(
   @id VARCHAR (255)
)
AS
BEGIN
    -- DELETE FROM bookings WHERE id = @id 
     UPDATE bookings SET isDeleted = 1 WHERE id = @id;
END