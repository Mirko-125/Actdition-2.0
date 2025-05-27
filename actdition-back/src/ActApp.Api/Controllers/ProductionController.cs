using ActApp.Api.DTOs;
using ActApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.CompilerServices;

namespace ActApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Production>> CreateProduction([FromBody] Production production)
        {
            bool nameExists = await _context.Productions.AnyAsync(p => p.Name.ToLower() == production.Name.ToLower());
            if (nameExists)
            {
                return Conflict(new { message = "A production with this name already exists." });
            }
            _context.Productions.Add(production);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProductionById), new { id = production.Id }, production);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Production>> GetProductionById(int id)
        {
            var production = await _context.Productions.FindAsync(id);
            if (production == null)
            {
                return NotFound();
            }
            return production;
        }
    }
}