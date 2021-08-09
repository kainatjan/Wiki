using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;
using Wiki.ViewModels;

namespace Wiki.Interfaces
{
    public interface IJwtAuthenticationManager
    {
        UserViewModel Authenticate(UserViewModel userViewModel);
    }
}
