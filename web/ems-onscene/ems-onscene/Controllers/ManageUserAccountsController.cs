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
    public class ManageUserAccountsController : Controller
    {
        private emsonsceneEntities db = new emsonsceneEntities();

        // GET: ManageUserAccounts
        public ActionResult Index()
        {
            return View();
        }

        // GET: ManageUserAccounts/Details/5
        public ActionResult Details(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUser);
        }

        // GET: ManageUserAccounts/Create
        public ActionResult Create()
        {
            AspNetUser aspNetUser = new AspNetUser();

            // #### set default values

			GetSelectLists(aspNetUser);

            return View(aspNetUser);
        }

        // POST: ManageUserAccounts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,MemberName,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName,MedicalRank,IsCheckedIn,CheckedInDT,Approved")] AspNetUser aspNetUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.AspNetUsers.Add(aspNetUser);
                    db.SaveChanges();
                    return Redirect("/ManageUserAccounts/Edit/" + aspNetUser.Id + "?reload=&pageid=" + Request["pageid"]);
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
			GetSelectLists(aspNetUser);
            return View(aspNetUser);
        }

        // GET: ManageUserAccounts/Edit/5
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
			GetSelectLists(aspNetUser);
            return View(aspNetUser);
        }

        // POST: ManageUserAccounts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,MemberName,Email,EmailConfirmed,PasswordHash,SecurityStamp,PhoneNumber,PhoneNumberConfirmed,TwoFactorEnabled,LockoutEndDateUtc,LockoutEnabled,AccessFailedCount,UserName,MedicalRank,IsCheckedIn,CheckedInDT,Approved")] AspNetUser aspNetUser)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    db.Entry(aspNetUser).State = EntityState.Modified;
                    db.SaveChanges();
                    return Redirect("/ManageUserAccounts/Edit/" + aspNetUser.Id + "?reload=&pageid=" + Request["pageid"]);
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
			GetSelectLists(aspNetUser);
            return View(aspNetUser);
        }

        // GET: ManageUserAccounts/Delete/5
        public ActionResult Delete(string id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            if (aspNetUser == null)
            {
                return HttpNotFound();
            }
            return View(aspNetUser);
        }

        // POST: ManageUserAccounts/DeleteConfirmed/5
        public ActionResult DeleteConfirmed(string id)
        {
            AspNetUser aspNetUser = db.AspNetUsers.Find(id);
            db.AspNetUsers.Remove(aspNetUser);
            //aspNetUser.IsDeleted = true;
            db.SaveChanges();
            // return RedirectToAction("Index");
            return Redirect("/home/Deleted?javascriptcommand=reloadmanageuseraccountsgrid" + Request["pageid"]);
        }

		private void GetSelectLists(AspNetUser aspNetUser)
        {
            ViewBag.MedicalRank = new SelectList(db.EMSRoles, "MedicalRank", "MedicalRank", aspNetUser.MedicalRank);
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
