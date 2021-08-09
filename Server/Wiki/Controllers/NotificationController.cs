using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Hubs;

namespace Wiki.Controllers
{
    public class NotificationController : Controller
    {
        // private IHubContext<NotificationHub> NotificationHub;
      //  private NotificationHub NotificationHub = new NotificationHub();
        private static Dictionary<string, string> ConnectedUsers = new Dictionary<string, string>();
        //public NotificationController(IHubContext<NotificationHub> NotificationHub)
        //{
        //    this.NotificationHub = NotificationHub;
        //}

        public async Task AddConnectedUsers(string userId)
        {
           // await NotificationHub.AddConnectedUsers(userId);
        }




        // GET: NotificationController
        public ActionResult Index()
        {
            return View();
        }

        // GET: NotificationController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: NotificationController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: NotificationController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
