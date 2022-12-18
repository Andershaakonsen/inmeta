using System.Security.Claims;
using inmeta.Dtos.Order;
using inmeta.Models;
using inmeta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace inmeta.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost]
    public async Task<ActionResult<ServiceResponse<GetOrderDto>>> AddOrder(AddOrderDto order)
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);
        return Ok(await _orderService.AddOrder(id, order.CustomerId, order));
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<GetOrderDto>>>> GetOrders()
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);
        return Ok(await _orderService.GetOrders(id));
    }

    [HttpDelete("{orderId}")]
    public async Task<ActionResult<ServiceResponse<GetOrderDto>>> DeleteOrder(int orderId)
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);
        return Ok(await _orderService.DeleteOrder(id, orderId));
    }

    [HttpPut]
    public async Task<ActionResult<ServiceResponse<GetOrderDto>>> UpdateOrder(GetOrderDto order)
    {
        System.Console.WriteLine("Order id in controller" + order.Id);
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        int id = int.Parse(userId);

        return Ok(await _orderService.UpdateOrder(id, order));
    }
}
