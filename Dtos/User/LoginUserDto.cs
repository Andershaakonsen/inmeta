using System.ComponentModel.DataAnnotations;

namespace inmeta.Dtos.User;

public class LoginUserDto
{
    [EmailAddress]
    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
