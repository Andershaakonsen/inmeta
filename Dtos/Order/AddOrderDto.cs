namespace inmeta.Dtos.Order;

public class AddOrderDto
{
    public string AddressFrom { get; set; }
    public string AddressTo { get; set; }
    public string ServiceType { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public DateTime Date { get; set; }
    public string Note { get; set; }
    public int CustomerId { get; set; }
}
