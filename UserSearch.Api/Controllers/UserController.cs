using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserSearch.Api.Data;
using UserSearch.Api.Models;

namespace UserSearch.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {

        private readonly AppDbContext _context;

        public UserController(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        // Search Users by first or last name
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return Ok(new List<User>());
            }

            string standardizedSearchTerm = searchTerm.ToLower();

            List<User> users = await _context.Users
                .Where(user =>
                    user.FirstName.ToLower().Contains(standardizedSearchTerm) ||
                    user.LastName.ToLower().Contains(standardizedSearchTerm))
                .ToListAsync();

            return Ok(users);
        }

        // Get user by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            User? user = await _context.Users.FindAsync(id);

            return user != null ? Ok(user) : NotFound();
        }

        // Add new user
        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            // Check if user with the same email already exists
            var exists = await _context.Users
                .AnyAsync(u => u.Email == user.Email);

            if (exists)
            {
                return BadRequest("User with this email already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
    }
}
