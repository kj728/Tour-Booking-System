USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE addHotel(@id VARCHAR(255),
    @hotelname VARCHAR(255),
    @hotellocation VARCHAR(255),
    @hotelrating INT )
AS
BEGIN
    INSERT INTO hotels
        (id,hotelname,hotellocation,hotelrating)
    VALUES
        (@id, @hotelname, @hotellocation, @hotelrating)
END