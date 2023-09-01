using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;

namespace ems_onscene.Controllers
{
    public class BagCheckDetailsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: BagCheckDetails
        public ActionResult Index()
        {
            var eMSBagCheckDetails = db.EMSBagCheckDetails.Include(e => e.EMSBagCheck);
            return View(eMSBagCheckDetails.ToList());
        }

        // GET: BagCheckDetails/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheckDetail eMSBagCheckDetail = db.EMSBagCheckDetails.Find(id);
            if (eMSBagCheckDetail == null)
            {
                return HttpNotFound();
            }
            return View(eMSBagCheckDetail);
        }

        // GET: BagCheckDetails/Create
        public ActionResult Create(string Id)
        {
            ViewBag.EMSBagCheckId = new SelectList(db.EMSBagChecks, "Id", "BagCheckTitle", Id);
            return View();
        }

        // POST: BagCheckDetails/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Create([Bind(Include = "Id,EMSBagCheckId,Detail")] EMSBagCheckDetail eMSBagCheckDetail)
        {
            if (ModelState.IsValid)
            {
                db.EMSBagCheckDetails.Add(eMSBagCheckDetail);
                db.SaveChanges();
                return RedirectToAction("details", "bagcheckmanagement", new { id = eMSBagCheckDetail.EMSBagCheckId });
            }

            ViewBag.EMSBagCheckId = new SelectList(db.EMSBagChecks, "Id", "BagCheckTitle", eMSBagCheckDetail.EMSBagCheckId);
            return View(eMSBagCheckDetail);
        }

        // GET: BagCheckDetails/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheckDetail eMSBagCheckDetail = db.EMSBagCheckDetails.Find(id);
            if (eMSBagCheckDetail == null)
            {
                return HttpNotFound();
            }
            ViewBag.EMSBagCheckId = new SelectList(db.EMSBagChecks, "Id", "BagCheckTitle", eMSBagCheckDetail.EMSBagCheckId);
            return View(eMSBagCheckDetail);
        }

        // POST: BagCheckDetails/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "Id,EMSBagCheckId,Detail")] EMSBagCheckDetail eMSBagCheckDetail)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eMSBagCheckDetail).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Details", "bagcheckmanagement", new { id = eMSBagCheckDetail.EMSBagCheckId });
            }
            ViewBag.EMSBagCheckId = new SelectList(db.EMSBagChecks, "Id", "BagCheckTitle", eMSBagCheckDetail.EMSBagCheckId);
            return View(eMSBagCheckDetail);
        }

        // GET: BagCheckDetails/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSBagCheckDetail eMSBagCheckDetail = db.EMSBagCheckDetails.Find(id);
            if (eMSBagCheckDetail == null)
            {
                return HttpNotFound();
            }
            return View(eMSBagCheckDetail);
        }

        // POST: BagCheckDetails/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EMSBagCheckDetail eMSBagCheckDetail = db.EMSBagCheckDetails.Find(id);
            int? bagCheckId = eMSBagCheckDetail.EMSBagCheckId;
            db.EMSBagCheckDetails.Remove(eMSBagCheckDetail);
            db.SaveChanges();
            return RedirectToAction("details", "bagcheckmanagement", new { id =bagCheckId });
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
