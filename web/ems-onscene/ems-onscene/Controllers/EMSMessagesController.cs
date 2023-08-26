using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ems_onscene.Models.EntityModels;
using Microsoft.AspNet.Identity;

namespace acemsoncall.web.Controllers
{
    [Authorize]
    public class EMSMessagesController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: EMSMessages
        public ActionResult Index(string s)
        {
            string _userid = User.Identity.GetUserId();
            var eMSMessages = db.EMSMessages.Where(m => m.MessageTo == _userid);
            if (string.IsNullOrEmpty(s) == false)
            {
                eMSMessages = eMSMessages.Where(m => m.MessageTitle.IndexOf(s) >= 0);
            }
            eMSMessages = eMSMessages.OrderByDescending(m => m.MessageTimeSent).Include(e => e.AspNetUser).Include(e => e.AspNetUser1);
            return View(eMSMessages.ToList());
        }
        public ActionResult Sent(string s)
        {
            string _userid = User.Identity.GetUserId();
            var eMSMessages = db.EMSMessages.Where(m => m.MessageFrom == _userid);
            if (string.IsNullOrEmpty(s) == false)
            {
                eMSMessages = eMSMessages.Where(m => m.MessageTitle.IndexOf(s) >= 0);
            }
            eMSMessages = eMSMessages.OrderByDescending(m => m.MessageTimeSent).Include(e => e.AspNetUser).Include(e => e.AspNetUser1);
            return View(eMSMessages.ToList());
        }


        // GET: EMSMessages/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSMessage eMSMessage = db.EMSMessages.Find(id);
            if (eMSMessage == null)
            {
                return HttpNotFound();
            }
            return View(eMSMessage);
        }

        // GET: EMSMessages/Create
        public ActionResult Create()
        {
            ViewBag.MessageFrom = new SelectList(db.AspNetUsers, "Id", "MemberName");
            ViewBag.MessageTo = new SelectList(db.AspNetUsers, "Id", "MemberName");
            return View();
        }

        // POST: EMSMessages/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,MessageFrom,MessageTo,MessageTitle,MessageText,MessageTimeSent")] EMSMessage eMSMessage)
        {
            eMSMessage.MessageTimeSent = DateTime.Now;
            if (ModelState.IsValid)
            {
                db.EMSMessages.Add(eMSMessage);
                db.SaveChanges();
                return RedirectToAction("Sent");
            }

            ViewBag.MessageFrom = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageFrom);
            ViewBag.MessageTo = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageTo);
            return View(eMSMessage);
        }

        // GET: EMSMessages/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSMessage eMSMessage = db.EMSMessages.Find(id);
            if (eMSMessage == null)
            {
                return HttpNotFound();
            }
            ViewBag.MessageFrom = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageFrom);
            ViewBag.MessageTo = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageTo);
            return View(eMSMessage);
        }

        // POST: EMSMessages/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,MessageFrom,MessageTo,MessageTitle,MessageText,MessageTimeSent")] EMSMessage eMSMessage)
        {
            if (ModelState.IsValid)
            {
                db.Entry(eMSMessage).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.MessageFrom = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageFrom);
            ViewBag.MessageTo = new SelectList(db.AspNetUsers, "Id", "MemberName", eMSMessage.MessageTo);
            return View(eMSMessage);
        }

        // GET: EMSMessages/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            EMSMessage eMSMessage = db.EMSMessages.Find(id);
            if (eMSMessage == null)
            {
                return HttpNotFound();
            }
            return View(eMSMessage);
        }

        // POST: EMSMessages/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            EMSMessage eMSMessage = db.EMSMessages.Find(id);
            db.EMSMessages.Remove(eMSMessage);
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
