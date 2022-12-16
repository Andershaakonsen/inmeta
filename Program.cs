using inmeta.Data;
using inmeta.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Data Context
builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default"))
);

//Service
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();

//JWT
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        //Initialize a new instance of token validation parameters
        //and set these parameters
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                System.Text.Encoding.UTF8.GetBytes(
                    builder.Configuration.GetSection("AppSettings:Token").Value!
                )
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

//Automapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//To use JWT
app.UseAuthentication();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
;

app.Run();
