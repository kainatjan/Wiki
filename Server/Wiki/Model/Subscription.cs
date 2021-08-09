using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki.Model
{
    public class Subscription
    {
        public int Id { get; set; }
        [ForeignKey("Users")]
        public string UserId { get; set; }
    
        public int DocumentId { get; set; }
        public bool isDeleted { get; set; }
        public User Users { get; set; }
        public Workspace Workspaces { get; set; }
    }
}
