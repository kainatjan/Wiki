using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki.ViewModels
{
    public class WorkspaceViewModel
    {
        public int DocumentId { get; set; }
        public string UserId { get; set; }
        public int WorkspaceTypeId { get; set; }
        public string Title { get; set; }
        public string Document { get; set; }

        public bool isSubscribed { get; set; }
    }
}
