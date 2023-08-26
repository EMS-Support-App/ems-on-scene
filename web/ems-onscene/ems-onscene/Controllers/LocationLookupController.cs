using ems_onscene.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.Entity;

namespace acemsoncall.web.Controllers
{
    public class LocationLookupController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        // GET: LocationLookup
        public ActionResult Index(string s)
        {
            var eMSContents = db.EMSContents.Where(e => e.contenttype == "Location");
            if (string.IsNullOrEmpty(s) == false)
            {
                eMSContents = eMSContents.Where(m => m.title.IndexOf(s) >= 0);
            }
            eMSContents = eMSContents.OrderByDescending(e => e.id).Include(e => e.AspNetUser).Include(e => e.AspNetUser1);
            return View(eMSContents.ToList());
        }
    }
}