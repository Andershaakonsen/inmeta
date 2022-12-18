using System.ComponentModel.DataAnnotations;

namespace inmeta.Dtos.User;

public class AddUserDto
{
    [Required]
    public string DisplayName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
