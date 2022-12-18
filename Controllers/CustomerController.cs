using inmeta.Dtos.Customer;
using inmeta.Models;
using inmeta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

// using Microsoft.AspNetCore.Authorization;

namespace inmeta.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<GetCustomerDto>>> AddCustomer(
        AddCustomerDto customer
    )
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;

        return Ok(await _customerService.AddCustomer(customer, int.Parse(userId)));
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<GetCustomerDto>>>> GetCustomers()
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);
        return Ok(await _customerService.GetCustomers(id));
    }

    [HttpDelete("{customerId}")]
    public async Task<ActionResult<ServiceResponse<GetCustomerDto>>> DeleteCustomer(int customerId)
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);
        return Ok(await _customerService.DeleteCustomer(id, customerId));
    }
}
