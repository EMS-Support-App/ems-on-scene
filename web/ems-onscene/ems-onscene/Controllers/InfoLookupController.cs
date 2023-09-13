using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;
using System.Data.Entity;


namespace acemsoncall.web.Controllers
{
    public class InfoLookupController : Controller
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
        // GET: InfoLookup
        public ActionResult Index(string s, int p = 1, int ps = 5)
        {
            var eMSContents = db.EMSContents.Where(e => e.contenttype == "Information");
            if (string.IsNullOrEmpty(s) == false)
            {
                eMSContents = eMSContents.Where(m => m.title.IndexOf(s) >= 0);
            }
            int recordCount = eMSContents.Count();
            int pageCount = (recordCount / ps) + (recordCount % ps > 0 ? 1 : 0);
            ViewBag.currentPage = p;
            ViewBag.recordCount = recordCount;
            ViewBag.pageCount = pageCount;
            eMSContents = eMSContents.OrderByDescending(e => e.id).Include(e => e.AspNetUser).Include(e => e.AspNetUser1).Skip((p - 1) * ps).Take(ps);
            return View(eMSContents.ToList());
        }
    }
}