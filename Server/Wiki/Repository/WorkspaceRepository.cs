using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;
using Wiki.ViewModels;

namespace Wiki.Repository
{
    public class WorkspaceRepository
    {
        WikiDbContext db;
        public WorkspaceRepository(WikiDbContext db)
        {
            this.db = db;
        }
        public bool CreateDocument(WorkspaceViewModel workspaceViewModel)
        {
            var s = db.Workspaces.Add(new Workspace
            {
                Document = workspaceViewModel.Document,
                Title = workspaceViewModel.Title,
                WorkspaceTypeId = workspaceViewModel.WorkspaceTypeId,
                UserId = workspaceViewModel.UserId
            });
            db.SaveChanges();
            return true;
        }

        public List<Workspace> GetAllWorkspaces(string userId)
        {
            var workspaceTypeId = db.WorkspaceType.Where(e => e.TypeName == "Public").FirstOrDefault().Id;


            var publicWorkspace = db.Workspaces.Where(e => e.isDeleted == false && e.WorkspaceTypeId== workspaceTypeId && e.UserId != userId).ToList();
          
            var userWorkspace = db.Workspaces.Where(e => e.isDeleted == false && e.UserId == userId).ToList();

            publicWorkspace.AddRange(userWorkspace);
            return publicWorkspace;
        }

        public WorkspaceViewModel GetSelectedDocument(int documentId, string userId)
        {
            var document = db.Workspaces.Where(e => e.Id == documentId).FirstOrDefault();
            var WorkspaceViewModel = new WorkspaceViewModel()
            {
                //Document= db.Workspaces.Where(e => e.Id == documentId).FirstOrDefault().Document,
                Document = document.Document,
                DocumentId = document.Id,
                Title = document.Title,
                WorkspaceTypeId = document.WorkspaceTypeId,
                UserId = document.UserId,
                isSubscribed = db.Subscription.Where(e => e.DocumentId == documentId && e.UserId == userId && e.isDeleted == false)
                                          .FirstOrDefault() == null ? false : true,
            };
            return WorkspaceViewModel;
        }
        internal bool EditDocument(WorkspaceViewModel workspaceViewModel)
        {
            var document = db.Workspaces.Where(e => e.Id == workspaceViewModel.DocumentId).FirstOrDefault();
            if (document != null)
            {
                try
                {
                    document.Document = workspaceViewModel.Document;
                    document.Title = workspaceViewModel.Title;
                    document.WorkspaceTypeId = workspaceViewModel.WorkspaceTypeId;
                    db.SaveChanges();
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
            return false;
        }

        internal bool SubscribeDocument(SubscribeViewModel subscribeViewModel)
        {
            try
            {
                var subscription = db.Subscription.Add(new Subscription
                {
                    DocumentId = subscribeViewModel.DocumentId,
                    isDeleted = false,
                    UserId = subscribeViewModel.UserId
                });
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;

            }
        }
    }
}
