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
    builder.EntitySet<Personnel>("Personnels");
    builder.EntitySet<EMSRole>("EMSRoles"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class PersonnelsController : ODataController
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: odata/Personnels
        [EnableQuery]
        public IQueryable<Personnel> GetPersonnels()
        {
            return db.Personnels;
        }

        // GET: odata/Personnels(5)
        [EnableQuery]
        public SingleResult<Personnel> GetPersonnel([FromODataUri] int key)
        {
            return SingleResult.Create(db.Personnels.Where(personnel => personnel.id == key));
        }

        // PUT: odata/Personnels(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Personnel> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Personnel personnel = db.Personnels.Find(key);
            if (personnel == null)
            {
                return NotFound();
            }

            patch.Put(personnel);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(personnel);
        }

        // POST: odata/Personnels
        public IHttpActionResult Post(Personnel personnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Personnels.Add(personnel);
            db.SaveChanges();

            return Created(personnel);
        }

        // PATCH: odata/Personnels(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Personnel> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Personnel personnel = db.Personnels.Find(key);
            if (personnel == null)
            {
                return NotFound();
            }

            patch.Patch(personnel);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonnelExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(personnel);
        }

        // DELETE: odata/Personnels(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Personnel personnel = db.Personnels.Find(key);
            if (personnel == null)
            {
                return NotFound();
            }

            db.Personnels.Remove(personnel);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Personnels(5)/EMSRole
        [EnableQuery]
        public SingleResult<EMSRole> GetEMSRole([FromODataUri] int key)
        {
            return SingleResult.Create(db.Personnels.Where(m => m.id == key).Select(m => m.EMSRole));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonnelExists(int key)
        {
            return db.Personnels.Count(e => e.id == key) > 0;
        }
    }
}
