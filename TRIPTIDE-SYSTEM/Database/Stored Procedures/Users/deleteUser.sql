USE TRIPTIDE;
GO
CREATE OR ALTER PROCEDURE deleteUser(@id VARCHAR (255))
AS
BEGIN
    -- DELETE FROM users WHERE id = @id;
    UPDATE users SET isDeleted = 1 WHERE id = @id;
END;

