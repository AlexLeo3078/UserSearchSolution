using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserSearch.Api.Data;
using UserSearch.Api.Helpers;
using UserSearch.Api.Models;

namespace UserSearch.Api.Controllers
{
    [ApiController]
    [Route("api/user-import")]
    public class UserImportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserImportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("seed")]
        public async Task<IActionResult> SeedDatabase(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded");

            if (!file.FileName.EndsWith(".xlsx"))
            {
                return BadRequest("Only .xlsx files are allowed");
            }

            var users = new List<User>();

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                stream.Position = 0;

                using var workbook = new XLWorkbook(stream);
                var worksheet = workbook.Worksheet(1);
                var rows = worksheet.RowsUsed().Skip(1);

                int skipped = 0;

                var existingEmails = (await _context.Users
                    .Select(u => u.Email)
                    .ToListAsync())
                    .ToHashSet(StringComparer.OrdinalIgnoreCase);

                var newEmails = new HashSet<string>(StringComparer.OrdinalIgnoreCase);


                foreach (var row in rows)
                {
                    var firstName = row.Cell(1).GetString().Trim();
                    var lastName = row.Cell(2).GetString().Trim();
                    var jobTitle = row.Cell(3).GetString().Trim();
                    var phone = row.Cell(4).GetString().Trim();
                    var email = row.Cell(5).GetString().Trim();


                    if (!Validation.IsValidName(firstName) ||
                        !Validation.IsValidName(lastName) ||
                        !Validation.IsValidEmail(email) ||
                        !Validation.IsValidPhone(phone) ||
                        existingEmails.Contains(email) ||
                        newEmails.Contains(email))
                    {
                        skipped++;
                        continue;
                    }

                    newEmails.Add(email);

                    users.Add(new User
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        JobTitle = string.IsNullOrWhiteSpace(jobTitle) ? null : jobTitle,
                        Phone = phone,
                        Email = email
                    });
                }

                _context.Users.AddRange(users);
                await _context.SaveChangesAsync();

                return Ok(new { Imported = users.Count, Skipped = skipped });
            }
        }
    }
}
