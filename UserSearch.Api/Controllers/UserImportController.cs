using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using UserSearch.Api.Data;
using UserSearch.Api.Models;

namespace UserSearch.Api.Controllers
{
    public class UserImportController : Controller
    {
        private readonly AppDbContext _context;

        public UserImportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadUsers(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            var users = new List<User>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);

                using var workbook = new XLWorkbook(stream);
                var worksheet = workbook.Worksheet(1);
                var rows = worksheet.RowsUsed().Skip(1); // skip header

                foreach (var row in rows)
                {
                    var firstName = row.Cell(1).GetString();
                    var lastName = row.Cell(2).GetString();
                    var jobTitle = row.Cell(3).GetString();
                    var phone = row.Cell(4).GetString();
                    var email = row.Cell(5).GetString();

                    if (
                           string.IsNullOrWhiteSpace(firstName)
                        || string.IsNullOrWhiteSpace(lastName)
                        || string.IsNullOrWhiteSpace(email)
                        || string.IsNullOrWhiteSpace(jobTitle)
                        || string.IsNullOrWhiteSpace(phone)
                      )
                    {
                        continue;
                    }

                    users.Add(new User
                    {
                        FirstName = firstName.Trim(),
                        LastName = lastName.Trim(),
                        JobTitle = jobTitle.Trim(),
                        Phone = phone.Trim(),
                        Email = email.Trim()
                    });
                }
            }

            try
            {
                _context.Users.AddRange(users);
                await _context.SaveChangesAsync();

                return Ok(new { Count = users.Count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving users: {ex.InnerException}");
            }
        }
    }
}
