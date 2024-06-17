USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE deleteTour(@id VARCHAR(255))
AS
BEGIN
   -- DELETE FROM tours WHERE id = @id
    UPDATE tours SET isDeleted = 1 WHERE id = @id;
END