using System.Security.Claims;
using inmeta.Dtos.User;
using inmeta.Models;
using inmeta.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace inmeta.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("Register")]
    public async Task<ActionResult<ServiceResponse<String>>> Register(AddUserDto user)
    {
        return Ok(await _userService.Register(user));
    }

    [HttpPost("Login")]
    public async Task<ActionResult<ServiceResponse<String>>> Login(LoginUserDto user)
    {
        return Ok(await _userService.Login(user));
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ServiceResponse<GetUserDto>>> GetUser()
    {
        var userId = HttpContext.User.Claims.First(i => i.Type == ClaimTypes.NameIdentifier).Value;
        return Ok(await _userService.GetUser(Int32.Parse(userId)));
    }
}
