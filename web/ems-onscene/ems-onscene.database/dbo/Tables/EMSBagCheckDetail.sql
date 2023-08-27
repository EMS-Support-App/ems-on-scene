CREATE TABLE [dbo].[EMSBagCheckDetail] (
    [Id]            INT            IDENTITY (1, 1) NOT NULL,
    [EMSBagCheckId] INT            NULL,
    [Detail]        NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_EMSBagCheckDetail] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_EMSBagCheckDetail_EMSBagCheck] FOREIGN KEY ([EMSBagCheckId]) REFERENCES [dbo].[EMSBagCheck] ([Id])
);



