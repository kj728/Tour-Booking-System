USE TRIPTIDE;
GO

CREATE OR ALTER PROCEDURE updateHotel(@id VARCHAR(255),
    @hotelname VARCHAR(255),
    @hotellocation VARCHAR(255),
    @hotelrating INT
)
AS
BEGIN
    UPDATE hotels SET
    id = @id,
    hotelname=@hotelname,
    hotellocation=@hotellocation, 
    hotelrating=@hotelrating 
    WHERE id = @id
END