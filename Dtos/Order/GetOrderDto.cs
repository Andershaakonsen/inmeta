namespace inmeta.Dtos.Order;

#nullable disable
public class GetOrderDto
{
    public int Id { get; set; }
    public string AddressFrom { get; set; }
    public string AddressTo { get; set; }
    public string ServiceType { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public DateTime Date { get; set; }
    public string Note { get; set; }
    public int CustomerId { get; set; }
}
