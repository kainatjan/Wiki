using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;
using Microsoft.AspNetCore.Http;
using Wiki.Repository;
using Wiki.ViewModels;

namespace Wiki.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public WikiDbContext db;
        public string GetConnectionId() => Context.ConnectionId.ToString();
        private static Dictionary<string, string> ConnectedUsers = new Dictionary<string, string>();
        public NotificationHub(WikiDbContext db)//, IHttpContextAccessor _contextAccessor)
        {
            this.db = db;
        }
        public async Task AddConnectedUsers(string userId)
        {
            ConnectedUsers.Add(userId, Context.ConnectionId);
            await Groups.AddToGroupAsync(Context.ConnectionId, "ConnectedUsers");
        }


        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
            await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", "Another User Connected");
        }



        public override async Task OnDisconnectedAsync(Exception ex)
        {
            var userId = ConnectedUsers.FirstOrDefault(x => x.Value == Context.ConnectionId).Key; 
            ConnectedUsers.Remove(userId);
        }
        public async Task Hmmm()
        {
            await Clients.Group("ConnectedUsers").SendAsync("ReceiveMessage", "hey Group");
            var user = ConnectedUsers.First();
            await Clients.Client(user.Value).SendAsync("ReceiveMessage", "Only the First connection should get this.");
        }

        public async Task Notification(UserConnection userConnection)
         {
            var getSubscribersUserIds = db.Subscription
                                        .Include("Users")
                                        .Include("Workspaces")
                                        .Where(e => e.isDeleted == false && e.DocumentId == Convert.ToInt32(userConnection.DocumentId.ToString()))
                                        .Select(e => e.UserId)
                                        .ToList();
            for (int i = 0; i < getSubscribersUserIds.Count; i++)
            {
                string subscribedUserConnectionId = ConnectedUsers[getSubscribersUserIds[i]];
                if (subscribedUserConnectionId != null)
                {
                    await Clients.Client(subscribedUserConnectionId).SendAsync("ReceiveMessage", "Author updated the document");
                    await Groups.AddToGroupAsync(subscribedUserConnectionId, "Subscribers");
                }
            }
            await Clients.Group("Subscribers").SendAsync("ReceiveMessage", "hey Group");
           

        }
    }
}