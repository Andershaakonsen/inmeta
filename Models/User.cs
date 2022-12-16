namespace inmeta.Models;

public class User
{
    public int Id { get; set; }
    public string DisplayName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public List<Order>? Orders { get; set; }
    public List<Customer>? Customers { get; set; }
}
