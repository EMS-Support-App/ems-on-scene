using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using ems_onscene.Models.EntityModels;

namespace ems_onscene.Controllers.OData
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using ems_onscene.Models.EntityModels;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<EMSOrganization>("EMSOrganizations");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class EMSOrganizationsController : ODataController
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: odata/EMSOrganizations
        [EnableQuery]
        public IQueryable<EMSOrganization> GetEMSOrganizations()
        {
            return db.EMSOrganizations;
        }

        // GET: odata/EMSOrganizations(5)
        [EnableQuery]
        public SingleResult<EMSOrganization> GetEMSOrganization([FromODataUri] int key)
        {
            return SingleResult.Create(db.EMSOrganizations.Where(eMSOrganization => eMSOrganization.Id == key));
        }

        // PUT: odata/EMSOrganizations(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<EMSOrganization> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(key);
            if (eMSOrganization == null)
            {
                return NotFound();
            }

            patch.Put(eMSOrganization);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EMSOrganizationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(eMSOrganization);
        }

        // POST: odata/EMSOrganizations
        public IHttpActionResult Post(EMSOrganization eMSOrganization)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.EMSOrganizations.Add(eMSOrganization);
            db.SaveChanges();

            return Created(eMSOrganization);
        }

        // PATCH: odata/EMSOrganizations(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<EMSOrganization> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(key);
            if (eMSOrganization == null)
            {
                return NotFound();
            }

            patch.Patch(eMSOrganization);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EMSOrganizationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(eMSOrganization);
        }

        // DELETE: odata/EMSOrganizations(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(key);
            if (eMSOrganization == null)
            {
                return NotFound();
            }

            db.EMSOrganizations.Remove(eMSOrganization);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EMSOrganizationExists(int key)
        {
            return db.EMSOrganizations.Count(e => e.Id == key) > 0;
        }
    }
}
