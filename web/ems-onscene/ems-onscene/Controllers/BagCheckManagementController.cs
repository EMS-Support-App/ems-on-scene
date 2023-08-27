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
    public class BagCheckManagementController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: BagCheckManagement
        public ActionResult Index()
        {
            return View(db.EMSBagChecks.ToList());
        }

        // GET: BagCheckManagement/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheck eMSBagCheck = db.EMSBagChecks.Find(id);
            if (eMSBagCheck == null)
            {
                return HttpNotFound();
            }
            return View(eMSBagCheck);
        }

        // GET: BagCheckManagement/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: BagCheckManagement/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,BagCheckTitle")] EMSBagCheck eMSBagCheck)
        {
            if (ModelState.IsValid)
            {
                db.EMSBagChecks.Add(eMSBagCheck);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(eMSBagCheck);
        }

        // GET: BagCheckManagement/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheck eMSBagCheck = db.EMSBagChecks.Find(id);
            if (eMSBagCheck == null)
            {
                return HttpNotFound();
            }
            return View(eMSBagCheck);
        }

        // POST: BagCheckManagement/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,BagCheckTitle")] EMSBagCheck eMSBagCheck)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eMSBagCheck).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(eMSBagCheck);
        }

        // GET: BagCheckManagement/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheck eMSBagCheck = db.EMSBagChecks.Find(id);
            if (eMSBagCheck == null)
            {
                return HttpNotFound();
            }
            return View(eMSBagCheck);
        }

        // POST: BagCheckManagement/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EMSBagCheck eMSBagCheck = db.EMSBagChecks.Find(id);
            db.EMSBagChecks.Remove(eMSBagCheck);
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
