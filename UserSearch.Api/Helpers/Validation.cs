using System.Text.RegularExpressions;

namespace UserSearch.Api.Helpers
{
    /**
     * Validation class 
     */
    public static class Validation
    {
        public static bool IsValidName(string value)
        {
            return !string.IsNullOrWhiteSpace(value) && value.Length >= 2;
        }

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }

        public static bool IsValidPhone(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone)) return false;

            return Regex.IsMatch(phone, @"^[0-9+\-\s()]{7,}$");
        }
    }
}
