CREATE TABLE [dbo].[EMSOrganization] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [OrganizationName] NVARCHAR (100) NOT NULL,
    [LogoImageUrl]     NVARCHAR (MAX) NULL,
    [HomepageImageUrl] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_EMSOrganization] PRIMARY KEY CLUSTERED ([Id] ASC)
);

