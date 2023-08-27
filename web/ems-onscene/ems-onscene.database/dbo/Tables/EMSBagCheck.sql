CREATE TABLE [dbo].[EMSBagCheck] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [BagCheckTitle] INT            NOT NULL,
    [Detail]        NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_EMSBagCheck] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EMSBagCheck_EMSBagCheckDetail] FOREIGN KEY ([BagCheckTitle]) REFERENCES [dbo].[EMSBagCheckDetail] ([Id])
);

