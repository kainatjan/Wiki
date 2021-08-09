using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki
{
    public class UserConnection
    {
        public string UserId { get; set; }

        public string? DocumentId { get; set; }

        public string ConnectionId { get; set; }
        public string GroupName { get; set; }
    }
}
