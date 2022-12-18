using Microsoft.EntityFrameworkCore;

namespace inmeta.Models;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    public int Id { get; set; }
    public string DisplayName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public List<Order>? Orders { get; set; }
    public List<Customer>? Customers { get; set; }
}
