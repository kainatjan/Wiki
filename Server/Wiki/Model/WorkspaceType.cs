using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki.Model
{
    public class WorkspaceType
    {
        [Key]
        [Required]
        public int Id { get; set; }
        public string TypeName { get; set; }
        public bool isDeleted { get; set; }
    }
}
