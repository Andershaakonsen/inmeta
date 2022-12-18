using System.ComponentModel.DataAnnotations;

namespace inmeta.Dtos.Customer;

#nullable disable

public class AddCustomerDto
{
    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string PhoneNumber { get; set; }
}
