USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE updateBooking(
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
    UPDATE bookings SET 
  id =@id,
  userid =@userid,
  tourid =@tourid,
  hotelid =@hotelid,
  bstartdate =@bstartdate,
  benddate =@benddate,
  bookingdate =@bookingdate,
  bguests=@bguests,
  bstatus =@bstatus,
  bemailSent =@bemailSent
    WHERE id =@id

END