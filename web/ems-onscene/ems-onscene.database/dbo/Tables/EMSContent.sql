CREATE TABLE [dbo].[EMSContent] (
    [id]          INT            IDENTITY (1, 1) NOT NULL,
    [contenttype] NVARCHAR (50)  NOT NULL,
    [title]       NVARCHAR (500) NOT NULL,
    [content]     NVARCHAR (MAX) NOT NULL,
    [registid]    NVARCHAR (128) NOT NULL,
    [registdt]    DATETIME       CONSTRAINT [DF__EMSConten__regis__34C8D9D1] DEFAULT (getdate()) NOT NULL,
    [updateid]    NVARCHAR (128) NULL,
    [updatedt]    DATETIME       NULL,
    CONSTRAINT [PK__EMSConte__3213E83F86012CCA] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_EMSContent_AspNetUsers_registid] FOREIGN KEY ([registid]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_EMSContent_AspNetUsers_updateid] FOREIGN KEY ([updateid]) REFERENCES [dbo].[AspNetUsers] ([Id]),
    CONSTRAINT [FK_EMSContent_ContentType] FOREIGN KEY ([contenttype]) REFERENCES [dbo].[ContentType] ([ContentType])
);

