﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ems_onscene.Models.EntityModels
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class emsonsceneEntities : DbContext
    {
        public emsonsceneEntities()
            : base("name=emsonsceneEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AspNetRole> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<ContentType> ContentTypes { get; set; }
        public virtual DbSet<EMSBagCheck> EMSBagChecks { get; set; }
        public virtual DbSet<EMSBagCheckDetail> EMSBagCheckDetails { get; set; }
        public virtual DbSet<EMSContent> EMSContents { get; set; }
        public virtual DbSet<EMSMessage> EMSMessages { get; set; }
        public virtual DbSet<EMSOrganization> EMSOrganizations { get; set; }
        public virtual DbSet<EMSRole> EMSRoles { get; set; }
        public virtual DbSet<Personnel> Personnels { get; set; }
        public virtual DbSet<WebMenuSetting> WebMenuSettings { get; set; }
    }
}
