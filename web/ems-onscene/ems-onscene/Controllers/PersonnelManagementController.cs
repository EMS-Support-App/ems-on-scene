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
    public class PersonnelManagementController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: PersonnelManagement
        public ActionResult Index()
        {
            return View();
        }

        // GET: PersonnelManagement/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Personnel personnel = db.Personnels.Find(id);
            if (personnel == null)
            {
                return HttpNotFound();
            }
            return View(personnel);
        }

        // GET: PersonnelManagement/Create
        public ActionResult Create()
        {
            Personnel personnel = new Personnel();

            // #### set default values

			GetSelectLists(personnel);

            return View(personnel);
        }

        // POST: PersonnelManagement/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,Name,Email,Rank,PhoneNumber")] Personnel personnel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Personnels.Add(personnel);
                    db.SaveChanges();
                    return Redirect("/PersonnelManagement/Edit/" + personnel.id + "?reload=&pageid=" + Request["pageid"]);
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
			GetSelectLists(personnel);
            return View(personnel);
        }

        // GET: PersonnelManagement/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Personnel personnel = db.Personnels.Find(id);
            if (personnel == null)
            {
                return HttpNotFound();
            }
			GetSelectLists(personnel);
            return View(personnel);
        }

        // POST: PersonnelManagement/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,Name,Email,Rank,PhoneNumber")] Personnel personnel)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(personnel).State = EntityState.Modified;
                    db.SaveChanges();
                    return Redirect("/PersonnelManagement/Edit/" + personnel.id + "?reload=&pageid=" + Request["pageid"]);
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
			GetSelectLists(personnel);
            return View(personnel);
        }

        // GET: PersonnelManagement/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Personnel personnel = db.Personnels.Find(id);
            if (personnel == null)
            {
                return HttpNotFound();
            }
            return View(personnel);
        }

        // POST: PersonnelManagement/DeleteConfirmed/5
        public ActionResult DeleteConfirmed(int id)
        {
            Personnel personnel = db.Personnels.Find(id);
            db.Personnels.Remove(personnel);
            //personnel.IsDeleted = true;
            db.SaveChanges();
            // return RedirectToAction("Index");
            return Redirect("/home/Deleted?javascriptcommand=reloadpersonnelmanagementgrid" + Request["pageid"]);
        }

		private void GetSelectLists(Personnel personnel)
        {
            // ViewBag.Rank = new SelectList(db.EMSRoles, "MedicalRank", "MedicalRank", personnel.Rank);
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
