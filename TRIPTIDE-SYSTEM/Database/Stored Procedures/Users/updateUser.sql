USE TRIPTIDE;
GO
CREATE OR ALTER PROCEDURE updateUser(
    @id VARCHAR(255),
    @username VARCHAR(255),
    @uemail VARCHAR(255),
    @upassword VARCHAR(255)
)
AS
BEGIN
    UPDATE users SET
        id=@id,
        username= @username,
        uemail=@uemail,
        upassword=@upassword
    WHERE id = @id
END