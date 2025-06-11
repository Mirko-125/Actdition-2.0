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

        [HttpPut("CompleteActorRegistration/{id}")]
        public async Task<IActionResult> CompleteActorRegistration(int id, [FromBody] ActorCompletionDto actorUpdate)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (user is Actor actor)
            {
                actor.Height = Convert.ToDouble(actorUpdate.Height);
                actor.Height = Convert.ToDouble(actorUpdate.Weight);
                actor.Birthdate = Convert.ToDateTime(actorUpdate.Birthdate);
                actor.Biography = actorUpdate.Biography;

                try
                {
                    await _context.SaveChangesAsync();
                    return Ok("Actor registration completed successfully.");
                }
                catch (DbUpdateException ex)
                {
                    return StatusCode(500, $"Error updating actor: {ex.Message}");
                }
            }
            else
            {
                return BadRequest("User is not an actor.");
            }
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
        [HttpGet("profilePicture/byIdentifier")]
        public async Task<IActionResult> GetProfilePictureByIdentifier(string identifier)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u =>
                u.Username == identifier ||
                u.EMail == identifier ||
                u.Phone == identifier);
            if (user == null)
                return NotFound("User not found.");
            var image = await _context.UserImages.SingleOrDefaultAsync(i => i.UserId == user.Id);
            if (image == null)
                return NotFound("Profile picture not found.");
            return File(image.ImageData, image.ContentType);
        }
        [HttpPost("{userId}/uploadProfilePicture")]
        public async Task<IActionResult> UploadProfilePicture(int userId, IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            if (!file.ContentType.StartsWith("image/"))
                return BadRequest("Only image files are allowed.");

            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            var imageData = ms.ToArray();

            var existingImage = await _context.UserImages.SingleOrDefaultAsync(i => i.UserId == userId);
            if (existingImage != null)
            {
                existingImage.ImageData = imageData;
                existingImage.ContentType = file.ContentType;
                existingImage.CreatedAt = DateTime.UtcNow;
            }
            else
            {
                var userImage = new UserImage
                {
                    UserId = userId,
                    ImageData = imageData,
                    ContentType = file.ContentType
                };
                _context.UserImages.Add(userImage);
            }

            await _context.SaveChangesAsync();

            return Ok("Profile picture uploaded successfully.");
        }
        [HttpGet("{userId}/profilePicture")]
        public async Task<IActionResult> GetProfilePicture(int userId)
        {
            var image = await _context.UserImages.SingleOrDefaultAsync(i => i.UserId == userId);
            if (image == null)
                return NotFound();

            return File(image.ImageData, image.ContentType);
        }
    }
}