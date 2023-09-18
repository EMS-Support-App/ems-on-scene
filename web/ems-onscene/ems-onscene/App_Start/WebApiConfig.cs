using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;
using ems_onscene.Models.EntityModels;

namespace ems_onscene
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<EMSOrganization>("EMSOrganizations");
            builder.EntitySet<Personnel>("Personnels");
            builder.EntitySet<AspNetUser>("AspNetUsers");
            builder.EntitySet<AspNetUserClaim>("AspNetUserClaims");
            builder.EntitySet<AspNetUserLogin>("AspNetUserLogins");
            builder.EntitySet<EMSRole>("EMSRoles");
            builder.EntitySet<EMSContent>("EMSContents");
            builder.EntitySet<EMSMessage>("EMSMessages");
            builder.EntitySet<AspNetRole>("AspNetRoles");
            builder.EntitySet<ContentType>("ContentTypes");
            builder.EntitySet<WebMenuSetting>("WebMenuSettings");

            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
        }
    }
}
