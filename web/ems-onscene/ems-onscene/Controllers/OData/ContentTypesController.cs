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
    builder.EntitySet<ContentType>("ContentTypes");
    builder.EntitySet<EMSContent>("EMSContents"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class ContentTypesController : ODataController
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: odata/ContentTypes
        [EnableQuery]
        public IQueryable<ContentType> GetContentTypes()
        {
            return db.ContentTypes;
        }

        // GET: odata/ContentTypes(5)
        [EnableQuery]
        public SingleResult<ContentType> GetContentType([FromODataUri] string key)
        {
            return SingleResult.Create(db.ContentTypes.Where(contentType => contentType.ContentType1 == key));
        }

        // PUT: odata/ContentTypes(5)
        public IHttpActionResult Put([FromODataUri] string key, Delta<ContentType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ContentType contentType = db.ContentTypes.Find(key);
            if (contentType == null)
            {
                return NotFound();
            }

            patch.Put(contentType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(contentType);
        }

        // POST: odata/ContentTypes
        public IHttpActionResult Post(ContentType contentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ContentTypes.Add(contentType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ContentTypeExists(contentType.ContentType1))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(contentType);
        }

        // PATCH: odata/ContentTypes(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] string key, Delta<ContentType> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            ContentType contentType = db.ContentTypes.Find(key);
            if (contentType == null)
            {
                return NotFound();
            }

            patch.Patch(contentType);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContentTypeExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(contentType);
        }

        // DELETE: odata/ContentTypes(5)
        public IHttpActionResult Delete([FromODataUri] string key)
        {
            ContentType contentType = db.ContentTypes.Find(key);
            if (contentType == null)
            {
                return NotFound();
            }

            db.ContentTypes.Remove(contentType);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/ContentTypes(5)/EMSContents
        [EnableQuery]
        public IQueryable<EMSContent> GetEMSContents([FromODataUri] string key)
        {
            return db.ContentTypes.Where(m => m.ContentType1 == key).SelectMany(m => m.EMSContents);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentTypeExists(string key)
        {
            return db.ContentTypes.Count(e => e.ContentType1 == key) > 0;
        }
    }
}
