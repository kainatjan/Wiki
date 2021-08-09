using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki.Model
{
    public class Workspace
    {
        //public Workspace()
        //{
        //    User = new User();
        //    WorkspaceType = new WorkspaceType();
        //}
        public int Id { get; set; }
        public string Title { get; set; }
        public string Document { get; set; }
        public bool isDeleted { get; set; }


        [ForeignKey("User")]
        public string UserId { get; set; }
        [ForeignKey("WorkspaceType")]
        public int WorkspaceTypeId { get; set; }
       
        public User User { get; set; }
        public WorkspaceType WorkspaceType { get; set; }

    }
}
