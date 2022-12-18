namespace inmeta.Models;

public class Order
{
    public int Id { get; set; }
    public string AddressFrom { get; set; }
    public string AddressTo { get; set; }
    public string ServiceType { get; set; }
    public DateTime Date { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Note { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int CustomerId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public Customer Customer { get; set; }
}
