USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE updateTour(@id VARCHAR(255),
    @tourname VARCHAR(255),
    @tdestination VARCHAR(255),
    @tdescription VARCHAR(255),
    @tprice INT)
AS
BEGIN
    UPDATE tours SET 
    tourname = @tourname,
    tdestination = @tdestination,
    tdescription= @tdescription,
    tprice= @tprice 
    WHERE id = @id;
END