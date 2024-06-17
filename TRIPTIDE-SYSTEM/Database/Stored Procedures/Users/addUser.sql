USE TRIPTIDE;
GO
CREATE OR ALTER PROCEDURE addUser(
    @id VARCHAR(255),
    @username VARCHAR(255),
    @uemail VARCHAR(255),
    @upassword VARCHAR(255)
   
)
AS
BEGIN
    INSERT INTO users
        (id, username, uemail, upassword)
    VALUES
        (@id, @username, @uemail, @upassword)

END