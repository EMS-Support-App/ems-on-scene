CREATE TABLE [dbo].[EMSBagCheck] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [BagCheckTitle] NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_EMSBagCheck] PRIMARY KEY CLUSTERED ([Id] ASC)
);





