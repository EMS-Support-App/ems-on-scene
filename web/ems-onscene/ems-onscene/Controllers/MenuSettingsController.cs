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
    public class MenuSettingsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: MenuSettings
        public ActionResult Index()
        {
            return View();
        }

        // GET: MenuSettings/Details/5
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

        // GET: MenuSettings/Create
        public ActionResult Create()
        {
            WebMenuSetting webMenuSetting = new WebMenuSetting();

            // #### set default values

			GetSelectLists(webMenuSetting);

            return View(webMenuSetting);
        }

        // POST: MenuSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create([Bind(Include = "Id,ParentId,MenuName,URL,Sorting,Icon")] WebMenuSetting webMenuSetting)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.WebMenuSettings.Add(webMenuSetting);
                    db.SaveChanges();
                    return Redirect("/MenuSettings/Edit/" + webMenuSetting.Id + "?reload=&pageid=" + Request["pageid"]);
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

        // GET: MenuSettings/Edit/5
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

        // POST: MenuSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "Id,ParentId,MenuName,URL,Sorting,Icon")] WebMenuSetting webMenuSetting)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(webMenuSetting).State = EntityState.Modified;
                    db.SaveChanges();
                    return Redirect("/MenuSettings/Edit/" + webMenuSetting.Id + "?reload=&pageid=" + Request["pageid"]);
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

        // GET: MenuSettings/Delete/5
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

        // POST: MenuSettings/DeleteConfirmed/5
        public ActionResult DeleteConfirmed(int id)
        {
            WebMenuSetting webMenuSetting = db.WebMenuSettings.Find(id);
            db.WebMenuSettings.Remove(webMenuSetting);
            //webMenuSetting.IsDeleted = true;
            db.SaveChanges();
            // return RedirectToAction("Index");
            return Redirect("/home/Deleted?javascriptcommand=reloadmenusettingsgrid" + Request["pageid"]);
        }

		private void GetSelectLists(WebMenuSetting webMenuSetting)
        {
            // ViewBag.ParentId = new SelectList(db.WebMenuSettings, "Id", "MenuName", webMenuSetting.ParentId);
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
