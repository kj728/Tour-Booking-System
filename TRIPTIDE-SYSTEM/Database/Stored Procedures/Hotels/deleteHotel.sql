USE TRIPTIDE;
GO
CREATE OR ALTER PROCEDURE deleteHotel(@id VARCHAR(255))
AS
BEGIN
    -- DELETE FROM hotels WHERE id = @id;
      UPDATE hotels SET isDeleted = 1 WHERE id = @id;
END;
