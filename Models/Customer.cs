namespace inmeta.Models;

#nullable disable
public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public List<Order> Orders { get; set; }
}
