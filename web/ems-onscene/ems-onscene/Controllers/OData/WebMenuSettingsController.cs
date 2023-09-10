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
    builder.EntitySet<WebMenuSetting>("WebMenuSettings");
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class WebMenuSettingsController : ODataController
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: odata/WebMenuSettings
        [EnableQuery]
        public IQueryable<WebMenuSetting> GetWebMenuSettings()
        {
            return db.WebMenuSettings;
        }

        // GET: odata/WebMenuSettings(5)
        [EnableQuery]
        public SingleResult<WebMenuSetting> GetWebMenuSetting([FromODataUri] int key)
        {
            return SingleResult.Create(db.WebMenuSettings.Where(webMenuSetting => webMenuSetting.Id == key));
        }

        // PUT: odata/WebMenuSettings(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<WebMenuSetting> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(key);
            if (webMenuSetting == null)
            {
                return NotFound();
            }

            patch.Put(webMenuSetting);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WebMenuSettingExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(webMenuSetting);
        }

        // POST: odata/WebMenuSettings
        public IHttpActionResult Post(WebMenuSetting webMenuSetting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.WebMenuSettings.Add(webMenuSetting);
            db.SaveChanges();

            return Created(webMenuSetting);
        }

        // PATCH: odata/WebMenuSettings(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<WebMenuSetting> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(key);
            if (webMenuSetting == null)
            {
                return NotFound();
            }

            patch.Patch(webMenuSetting);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WebMenuSettingExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(webMenuSetting);
        }

        // DELETE: odata/WebMenuSettings(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(key);
            if (webMenuSetting == null)
            {
                return NotFound();
            }

            db.WebMenuSettings.Remove(webMenuSetting);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/WebMenuSettings(5)/WebMenuSetting1
        [EnableQuery]
        public IQueryable<WebMenuSetting> GetWebMenuSetting1([FromODataUri] int key)
        {
            return db.WebMenuSettings.Where(m => m.Id == key).SelectMany(m => m.WebMenuSetting1);
        }

        // GET: odata/WebMenuSettings(5)/WebMenuSetting2
        [EnableQuery]
        public SingleResult<WebMenuSetting> GetWebMenuSetting2([FromODataUri] int key)
        {
            return SingleResult.Create(db.WebMenuSettings.Where(m => m.Id == key).Select(m => m.WebMenuSetting2));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WebMenuSettingExists(int key)
        {
            return db.WebMenuSettings.Count(e => e.Id == key) > 0;
        }
    }
}
