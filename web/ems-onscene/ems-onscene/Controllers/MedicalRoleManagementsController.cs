using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;

namespace ems_onscene.Controllers
{
    public class MedicalRoleManagementsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: MedicalRoleManagements
        public ActionResult Index()
        {
            return View(db.EMSRoles.ToList());
        }

        // GET: MedicalRoleManagements/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSRole eMSRole = db.EMSRoles.Find(id);
            if (eMSRole == null)
            {
                return HttpNotFound();
            }
            return View(eMSRole);
        }

        // GET: MedicalRoleManagements/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MedicalRoleManagements/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "MedicalRank")] EMSRole eMSRole)
        {
            if (ModelState.IsValid)
            {
                db.EMSRoles.Add(eMSRole);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(eMSRole);
        }

        // GET: MedicalRoleManagements/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSRole eMSRole = db.EMSRoles.Find(id);
            if (eMSRole == null)
            {
                return HttpNotFound();
            }
            return View(eMSRole);
        }

        // POST: MedicalRoleManagements/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(string id, string MedicalRank)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSRole eMSRole = db.EMSRoles.Find(id);
            if (eMSRole == null)
            {
                return HttpNotFound();
            }
            eMSRole.MedicalRank = MedicalRank;
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: MedicalRoleManagements/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSRole eMSRole = db.EMSRoles.Find(id);
            if (eMSRole == null)
            {
                return HttpNotFound();
            }
            return View(eMSRole);
        }

        // POST: MedicalRoleManagements/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(string id)
        {
            EMSRole eMSRole = db.EMSRoles.Find(id);
            db.EMSRoles.Remove(eMSRole);
            db.SaveChanges();
            return RedirectToAction("Index");
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
