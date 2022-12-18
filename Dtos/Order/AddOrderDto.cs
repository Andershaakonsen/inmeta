using System.ComponentModel.DataAnnotations;

namespace inmeta.Dtos.Order;

public class AddOrderDto
{
    [Required]
    public string AddressFrom { get; set; }

    [Required]
    public string AddressTo { get; set; }

    [Required]
    public string ServiceType { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PhoneNumber { get; set; }

    [Required]
    public DateTime Date { get; set; }

    [Required]
    public string Note { get; set; }

    [Required]
    public int CustomerId { get; set; }
}
