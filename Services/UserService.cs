using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AutoMapper;
using inmeta.Data;
using inmeta.Dtos.User;
using inmeta.Models;

using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace inmeta.Services;

public interface IUserService
{
    Task<ServiceResponse<String>> Register(AddUserDto user);
    Task<ServiceResponse<String>> Login(LoginUserDto user);
    Task<ServiceResponse<GetUserDto>> GetUser(int userId);
    // String er token
    // Task<ServiceResponse<String>> Register(AddUserDto user);
}

public class UserService : IUserService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public UserService(DataContext context, IMapper mapper, IConfiguration configuration)
    {
        _context = context;
        _mapper = mapper;
        _configuration = configuration;
    }

    public async Task<ServiceResponse<GetUserDto>> GetUser(int userId)
    {
        var response = new ServiceResponse<GetUserDto>();
        try
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "Could not find user in database";
                return response;
            }
            response.Data = _mapper.Map<GetUserDto>(user);
            response.Message = "User Succesfully found in db";
            return response;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
            return response;
        }
    }

    public async Task<ServiceResponse<string>> Login(LoginUserDto user)
    {
        var response = new ServiceResponse<string>();
        try
        {
            //Legge til validering
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (dbUser == null)
            {
                response.Message = "Invalid Credentials";
                response.Success = false;
                return response;
            }

            if (!BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password))
            {
                response.Message = "Invalid Credentials";
                response.Success = false;
                return response;
            }

            var token = CreateToken(dbUser);
            response.Data = token;
            response.Message = "Succesfully generated token!";
            return response;
        }
        catch (Exception e)
        {
            response.Success = false;
            response.Message = e.Message;
            return response;
        }
    }

    public async Task<ServiceResponse<String>> Register(AddUserDto user)
    {
        var response = new ServiceResponse<String>();
        try
        {
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashedPassword;
            var userToAdd = _mapper.Map<User>(user);
            // Inserts the user into the database and tracks the userToAdd variable
            // this means that once the changes are saved, .net finds the corresponding user object and assigns the ID and other props
            _context.Users.Add(userToAdd);
            await _context.SaveChangesAsync();

            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Id == userToAdd.Id);
            //Add validate for dbuser being null later
            if (dbUser == null)
                throw new ArgumentNullException("dbUser");

            var token = CreateToken(dbUser);
            response.Message = "Succesfully added user to db!";
            response.Data = token;

            return response;
        }
        catch (Exception e)
        {
            response.Success = false;
            response.Message = e.Message;
            return response;
        }
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.DisplayName)
        };

        var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;

        if (appSettingsToken is null)
            throw new Exception("AppSettingsToken is null!");

        SymmetricSecurityKey key = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(appSettingsToken)
        );

        //Creds contains information used to digitally sign the JWT,
        //allows the recipient of the JWT to verify that it has not been tampered with.
        SigningCredentials creds = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha512Signature
        );

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
