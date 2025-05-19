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
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user, [FromServices] IPasswordHasher<User> hasher)
        {
            user.Passphrase = hasher.HashPassword(user, user.Passphrase);
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
        [HttpGet("checkavailability")]
        public async Task<ActionResult<User>> CheckAvailability(string identifier)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Username == identifier ||
                u.EMail == identifier ||
                u.Phone == identifier);
            if (user == null) return Ok();
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LogInDto dto, [FromServices] IPasswordHasher<User> hasher, [FromServices] IConfiguration config)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Username == dto.Identifier ||
                u.EMail == dto.Identifier ||
                u.Phone == dto.Identifier);
            if (user == null) return Unauthorized("Invalid credentials");

            var result = hasher.VerifyHashedPassword(user, user.Passphrase, dto.Passphrase);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized("Invalid credentials");

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.Username)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            string jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new { token = jwt });
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            return user;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            if (user == null) return Ok();
            return BadRequest();
        }
        [HttpDelete("byIdentifier")]
        public async Task<ActionResult> DeleteUserByIdentifier(string identifier)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Username == identifier ||
                u.EMail == identifier ||
                u.Phone == identifier);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}