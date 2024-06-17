USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE addTour(@id VARCHAR(255), @tourname VARCHAR(255), @tdestination VARCHAR(255), @tdescription VARCHAR(255), @tprice INT)
AS
BEGIN
    INSERT INTO tours(id,tourname,tdestination,tdescription,tprice)
     VALUES(@id, @tourname, @tdestination, @tdescription, @tprice)
END