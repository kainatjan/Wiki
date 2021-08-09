using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Wiki.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspaceTypeController : ControllerBase
    {
        WikiDbContext db;
        public WorkspaceTypeController(WikiDbContext db)
        {
            this.db = db;
        }
        // GET: api/<WorkspaceTypeController>
        [HttpGet]
        public List<WorkspaceType> Get()
        {
            return db.WorkspaceType.Where(e=>e.isDeleted==false).ToList();
        }

        // GET api/<WorkspaceTypeController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<WorkspaceTypeController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<WorkspaceTypeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<WorkspaceTypeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
