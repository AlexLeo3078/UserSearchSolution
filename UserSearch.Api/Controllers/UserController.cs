using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserSearch.Api.Data;
using UserSearch.Api.Dto;
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

        // Get user suggestions
        [HttpGet("get-suggestions")]
        public async Task<IActionResult> GetSuggestions([FromQuery] string searchTerm)
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

            List<SuggestionResponse> suggestionsResponse = users
                .Select(x => new SuggestionResponse
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName
                }).ToList();

            return Ok(suggestionsResponse);
        }

        // Get user by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            User? user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            Response result = new Response
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                JobTitle = user.JobTitle ?? string.Empty,
                Email = user.Email,
                Phone = user.Phone
            };

            return Ok(result);
        }

        // Add new user
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] User user)
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

            Response result = new Response
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                JobTitle = user.JobTitle ?? string.Empty,
                Email = user.Email,
                Phone = user.Phone
            };

            return Ok(result);
        }
    }
}
