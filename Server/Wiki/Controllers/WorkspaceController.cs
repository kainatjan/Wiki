using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wiki.Model;
using Wiki.Repository;
using Wiki.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Wiki.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {
        WikiDbContext db;
        public WorkspaceController(WikiDbContext db)
        {
            this.db = db;
        }
        // GET: api/<WorkspaceController>
        [HttpGet]
        public List<Workspace> Get(string userId)
        {
            List<Workspace> lstWorkspace =new WorkspaceRepository(db).GetAllWorkspaces(userId);
            return lstWorkspace;
        }

        // GET api/<WorkspaceController>/5
        [HttpGet("{id}")]
        [Route("GetSelectedDocument" + "/{id}")]
        public WorkspaceViewModel Get(int documentId, string userId)
        {
            return new WorkspaceRepository(db).GetSelectedDocument(documentId, userId);
        }

        // POST api/<WorkspaceController>
        [HttpPost("CreateDocument")]

        public IActionResult CreateDocument([FromBody] WorkspaceViewModel workspaceViewModel)
        {
            try
            {
                return new WorkspaceRepository(db).CreateDocument(workspaceViewModel) == true ?
                                                   StatusCode(StatusCodes.Status200OK, workspaceViewModel)
                                                   : StatusCode(StatusCodes.Status503ServiceUnavailable, workspaceViewModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        // POST api/<WorkspaceController>
        [HttpPost("EditDocument")]
        public IActionResult EditDocument([FromBody] WorkspaceViewModel workspaceViewModel)
        {
            try
            {
                return new WorkspaceRepository(db).EditDocument(workspaceViewModel) == true ?
                                                   StatusCode(StatusCodes.Status200OK, workspaceViewModel)
                                                   : StatusCode(StatusCodes.Status503ServiceUnavailable, workspaceViewModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpPost("SubscribeDocument")]
        public IActionResult SubscribeDocument([FromBody] SubscribeViewModel SubscribeViewModel)
        {
            try
            {
                return new WorkspaceRepository(db).SubscribeDocument(SubscribeViewModel) == true ?
                                                   StatusCode(StatusCodes.Status200OK, SubscribeViewModel)
                                                   : StatusCode(StatusCodes.Status503ServiceUnavailable, SubscribeViewModel);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}
