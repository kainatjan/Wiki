using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;
using Wiki.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Wiki.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        WikiDbContext db;
        public SignUpController(WikiDbContext db)
        {
            this.db = db;
        }
        // GET: api/<SignUpController>
        [HttpGet]
        [Route("Test")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<SignUpController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SignUpController>
        [HttpPost]
        public IActionResult Post([FromBody] UserViewModel userViewModel)
        {
            try
            {
                if (db.Users.Where(e => e.UserName == userViewModel.UserName || e.Email == userViewModel.Email).FirstOrDefault() == null)
                {
                    //db.Users.Add(new User
                    //{
                    //    UserName = userViewModel.UserName,
                    //    Password = userViewModel.Password,
                    //    FirstName = userViewModel.FirstName,
                    //    LastName = userViewModel.LastName,
                    //    Email = userViewModel.Email,
                    //});
                    //db.SaveChanges();
                    return StatusCode(StatusCodes.Status200OK, userViewModel);
                }
                return StatusCode(StatusCodes.Status208AlreadyReported, userViewModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // PUT api/<SignUpController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SignUpController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
