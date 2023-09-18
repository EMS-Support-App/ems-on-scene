using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;

namespace acemsoncall.web.Controllers
{
    [Authorize(Roles = "admin")]

    public class EMSContentsController : Controller
    {

        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: EMSContents
        public ActionResult Index(string t=null, int p = 1, int ps = 20)
        {
            var eMSContents = db.EMSContents.Include(e => e.AspNetUser).Include(e => e.AspNetUser1);
            eMSContents = eMSContents.OrderByDescending(e => e.id).Include(e => e.AspNetUser).Include(e => e.AspNetUser1);
            if (t != null && !string.IsNullOrWhiteSpace(t))
            {
                eMSContents = eMSContents.Where(c=>c.contenttype == t);
            }
            int recordCount = eMSContents.Count();
            int pageCount = (recordCount / ps) + (recordCount % ps > 0 ? 1 : 0);
            ViewBag.currentPage = p;
            ViewBag.recordCount = recordCount;
            ViewBag.pageCount = pageCount;
            eMSContents = eMSContents.OrderByDescending(e => e.id).Include(e => e.AspNetUser).Include(e => e.AspNetUser1).Skip((p - 1) * ps).Take(ps);
            return View(eMSContents.ToList());
        }

        // GET: EMSContents/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSContent eMSContent = db.EMSContents.Find(id);
            if (eMSContent == null)
            {
                return HttpNotFound();
            }
            return View(eMSContent);
        }

        // GET: EMSContents/Create
        public ActionResult Create()
        {
            ViewBag.registid = new SelectList(db.AspNetUsers, "Id", "MemberName");
            ViewBag.updateid = new SelectList(db.AspNetUsers, "Id", "MemberName");
            ViewBag.contenttype = new SelectList(db.ContentTypes, "ContentType1", "ContentType1");
            return View();
        }

        // POST: EMSContents/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,contenttype,title,content,registid,registdt,updateid,updatedt")] EMSContent eMSContent)
        {
            eMSContent.registdt = DateTime.Now;

            if (ModelState.IsValid)
            {
                db.EMSContents.Add(eMSContent);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.registid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.registid);
            ViewBag.updateid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.updateid);
            ViewBag.contenttype = new SelectList(db.ContentTypes, "ContentType1", "ContentType1", eMSContent.contenttype);
            return View(eMSContent);
        }
        // GET: EMSContents/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSContent eMSContent = db.EMSContents.Find(id);
            if (eMSContent == null)
            {
                return HttpNotFound();
            }
            ViewBag.registid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.registid);
            ViewBag.updateid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.updateid);
            ViewBag.contenttype = new SelectList(db.ContentTypes, "ContentType1", "ContentType1", eMSContent.contenttype);
            return View(eMSContent);
        }

        // POST: EMSContents/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "id,contenttype,title,content,registid,registdt,updateid,updatedt")] EMSContent eMSContent)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eMSContent).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.registid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.registid);
            ViewBag.updateid = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSContent.updateid);
            ViewBag.contenttype = new SelectList(db.ContentTypes, "ContentType1", "ContentType1", eMSContent.contenttype);
            return View(eMSContent);
        }

        // GET: EMSContents/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSContent eMSContent = db.EMSContents.Find(id);
            if (eMSContent == null)
            {
                return HttpNotFound();
            }
            return View(eMSContent);
        }

        // POST: EMSContents/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EMSContent eMSContent = db.EMSContents.Find(id);
            db.EMSContents.Remove(eMSContent);
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
