using System.ComponentModel.DataAnnotations;

namespace UserSearch.Api.Models
{
    /**
     * Represents a user in the system.
     */
    public class User
    {
        public int Id { get; set; }
        
        public string FirstName { get; set; } = string.Empty;
           
        public string LastName { get; set; } = string.Empty;

        public string? JobTitle { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;
    }
}
