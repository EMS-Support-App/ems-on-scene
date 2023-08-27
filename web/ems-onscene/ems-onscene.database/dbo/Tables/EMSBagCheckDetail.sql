CREATE TABLE [dbo].[EMSBagCheckDetail] (
    [Id]            INT IDENTITY (1, 1) NOT NULL,
    [EMSBagCheckId] INT NULL,
    CONSTRAINT [PK_EMSBagCheckDetail] PRIMARY KEY CLUSTERED ([Id] ASC)
);

