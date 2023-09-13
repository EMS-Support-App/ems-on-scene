using ems_onscene.Models.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ems_onscene.Controllers
{
    public class ContentController : Controller
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

        // GET: Content
        public ActionResult Index(int id)
        {
            EMSContent eMSContent = db.EMSContents.First(c=>c.id == id);
            return View(eMSContent);
        }
    }
}