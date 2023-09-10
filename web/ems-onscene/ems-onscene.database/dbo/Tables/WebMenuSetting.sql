CREATE TABLE [dbo].[WebMenuSetting] (
    [Id]       INT           IDENTITY (1, 1) NOT NULL,
    [ParentId] INT           NULL,
    [MenuName] NVARCHAR (50) NOT NULL,
    [URL]      NCHAR (10)    NULL,
    [Sorting]  INT           NULL,
    CONSTRAINT [PK_WebMenuSetting] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_WebMenuSetting_WebMenuSetting] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[WebMenuSetting] ([Id])
);

