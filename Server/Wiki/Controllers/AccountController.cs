using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Interfaces;
using Wiki.Model;
using Wiki.ViewModels;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using Wiki.Repository;

namespace Wiki.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public WikiDbContext db;
        public IJwtAuthenticationManager jwtAuthenticationManager;

        public AccountController(IJwtAuthenticationManager jwtAuthenticationManager, IHttpContextAccessor _contextAccessor)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this._contextAccessor = _contextAccessor;
        }
        [HttpPost]
        [Route("Authenticate")]
        public IActionResult Authenticate([FromBody] UserViewModel userViewModel)
        {
         
            try
            {
                var user = jwtAuthenticationManager.Authenticate(userViewModel);
                if (user != null)
                {
                    //_contextAccessor.HttpContext.Session.SetString("id", "value");
                    //SessionRespository.SetSessionUserId(_contextAccessor.HttpContext.Session, "sessionUserId", user.UserId);
                    return Ok(user);
                }
                return BadRequest(new { message = "UserName or Password is incorrect" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        


    }
}
