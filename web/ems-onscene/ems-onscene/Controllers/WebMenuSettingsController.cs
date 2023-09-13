using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;
using System.Data.Entity.Validation;
using james.utils.database;


namespace ems_onscene.Controllers
{
    [Authorize(Roles ="admin")]
    public class WebMenuSettingsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: WebMenuSettings
        public ActionResult Index()
        {
            return View();
        }

        // GET: WebMenuSettings/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(id);
            if (webMenuSetting == null)
            {
                return HttpNotFound();
            }
            return View(webMenuSetting);
        }

        // GET: WebMenuSettings/Create
        public ActionResult Create()
        {
            WebMenuSetting webMenuSetting = new WebMenuSetting();

            // #### set default values

			GetSelectLists(webMenuSetting);

            return View(webMenuSetting);
        }

        // POST: WebMenuSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,ParentId,MenuName,URL,Sorting")] WebMenuSetting webMenuSetting)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.WebMenuSettings.Add(webMenuSetting);
                    db.SaveChanges();
                    return Redirect("/WebMenuSettings/Edit/" + webMenuSetting.Id + "?reload=&pageid=" + Request["pageid"]);
                }
                catch (DbEntityValidationException _exp)
                {
                    string _msg = DBUtils.GetDBValidationExceptionMessage(_exp);
                    ViewBag.ErrorMsg = _msg;
                }
                catch (Exception _exp)
                {
                    ViewBag.ErrorMsg = DBUtils.GetNormalExceptionMessage(_exp);
                }
            }
			GetSelectLists(webMenuSetting);
            return View(webMenuSetting);
        }

        // GET: WebMenuSettings/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(id);
            if (webMenuSetting == null)
            {
                return HttpNotFound();
            }
			GetSelectLists(webMenuSetting);
            return View(webMenuSetting);
        }

        // POST: WebMenuSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,ParentId,MenuName,URL,Sorting")] WebMenuSetting webMenuSetting)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(webMenuSetting).State = EntityState.Modified;
                    db.SaveChanges();
                    return Redirect("/WebMenuSettings/Edit/" + webMenuSetting.Id + "?reload=&pageid=" + Request["pageid"]);
                }
                catch (DbEntityValidationException _exp)
                {
                    string _msg = DBUtils.GetDBValidationExceptionMessage(_exp);
                    ViewBag.ErrorMsg = _msg;
                }
                catch (Exception _exp)
                {
                    ViewBag.ErrorMsg = DBUtils.GetNormalExceptionMessage(_exp);
                }
            }
			GetSelectLists(webMenuSetting);
            return View(webMenuSetting);
        }

        // GET: WebMenuSettings/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(id);
            if (webMenuSetting == null)
            {
                return HttpNotFound();
            }
            return View(webMenuSetting);
        }

        // POST: WebMenuSettings/DeleteConfirmed/5
        public ActionResult DeleteConfirmed(int id)
        {
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(id);
            db.WebMenuSettings.Remove(webMenuSetting);
            //webMenuSetting.IsDeleted = true;
            db.SaveChanges();
            // return RedirectToAction("Index");
            return Redirect("/home/Deleted?javascriptcommand=reloadwebmenusettingsgrid" + Request["pageid"]);
        }

		private void GetSelectLists(WebMenuSetting webMenuSetting)
        {
            ViewBag.ParentId = new SelectList(db.WebMenuSettings, "Id", "MenuName", webMenuSetting.ParentId);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
