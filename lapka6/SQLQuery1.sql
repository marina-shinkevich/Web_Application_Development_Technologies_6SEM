CREATE DATABASE Celebrities;
GO

USE Celebrities;
GO

CREATE TABLE [dbo].[Celebrities](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [FullName] [nvarchar](50) NOT NULL,
    [Nationality] [nvarchar](2) NOT NULL,
    [ReqPhotoPath] [nvarchar](200) NULL,

    CONSTRAINT [PK_Celebrities]
    PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

USE Celebrities;
GO

INSERT INTO dbo.Celebrities (FullName, Nationality, ReqPhotoPath)
VALUES
(N'Keanu Reeves', 'CA', '/photos/keanu.jpg'),
(N'Leonardo DiCaprio', 'US', '/photos/dicaprio.jpg'),
(N'Emma Watson', 'GB', '/photos/watson.jpg'),
(N'Jackie Chan', 'CN', '/photos/jackie.jpg'),
(N'Monica Bellucci', 'IT', '/photos/monica.jpg');
GO