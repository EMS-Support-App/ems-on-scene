CREATE TABLE [dbo].[Personnel] (
    [id]          INT             IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (500)  NULL,
    [Email]       NVARCHAR (1000) NULL,
    [Rank]        NVARCHAR (50)   NULL,
    [PhoneNumber] NVARCHAR (50)   NULL,
    CONSTRAINT [PK_Personnel] PRIMARY KEY CLUSTERED ([id] ASC),
    CONSTRAINT [FK_Personnel_EMSRole] FOREIGN KEY ([Rank]) REFERENCES [dbo].[EMSRole] ([MedicalRank])
);



