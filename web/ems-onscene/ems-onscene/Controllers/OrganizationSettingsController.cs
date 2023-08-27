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
    [Authorize(Roles ="admin")]
    public class OrganizationSettingsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: OrganizationSettings
        public ActionResult Index()
        {
            return View(db.EMSOrganizations.ToList());
        }

        // GET: OrganizationSettings/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(id);
            if (eMSOrganization == null)
            {
                return HttpNotFound();
            }
            return View(eMSOrganization);
        }

        // GET: OrganizationSettings/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: OrganizationSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,OrganizationName,LogoImageUrl,HomepageImageUrl")] EMSOrganization eMSOrganization)
        {
            if (ModelState.IsValid)
            {
                db.EMSOrganizations.Add(eMSOrganization);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(eMSOrganization);
        }

        // GET: OrganizationSettings/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(id);
            if (eMSOrganization == null)
            {
                return HttpNotFound();
            }
            return View(eMSOrganization);
        }

        // POST: OrganizationSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,OrganizationName,LogoImageUrl,HomepageImageUrl")] EMSOrganization eMSOrganization)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eMSOrganization).State = EntityState.Modified;
                db.SaveChanges();
                return Redirect("/OrganizationSettings/Edit/1");
            }
            return View(eMSOrganization);
        }

        // GET: OrganizationSettings/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(id);
            if (eMSOrganization == null)
            {
                return HttpNotFound();
            }
            return View(eMSOrganization);
        }

        // POST: OrganizationSettings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EMSOrganization eMSOrganization = db.EMSOrganizations.Find(id);
            db.EMSOrganizations.Remove(eMSOrganization);
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
