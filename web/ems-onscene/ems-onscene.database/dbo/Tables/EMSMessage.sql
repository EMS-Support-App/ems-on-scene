CREATE TABLE [dbo].[EMSMessage] (
    [id]              INT            IDENTITY (1, 1) NOT NULL,
    [MessageFrom]     NVARCHAR (128) NOT NULL,
    [MessageTo]       NVARCHAR (128) NOT NULL,
    [MessageTitle]    NVARCHAR (256) NOT NULL,
    [MessageText]     NVARCHAR (MAX) NOT NULL,
    [MessageTimeSent] DATETIME       NOT NULL,
    CONSTRAINT [PK_EMSMessage] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_EMSMessage_EMSMessage_FROM] FOREIGN KEY ([MessageFrom]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_EMSMessage_EMSMessage_TO] FOREIGN KEY ([MessageTo]) REFERENCES [dbo].[AspNetUsers] ([Id])
);

