using AutoMapper;
using inmeta.Data;
using inmeta.Dtos.Customer;
using inmeta.Models;
using Microsoft.EntityFrameworkCore;

namespace inmeta.Services;

public interface ICustomerService
{
    Task<ServiceResponse<GetCustomerDto>> AddCustomer(AddCustomerDto customer, int userId);
    Task<ServiceResponse<List<GetCustomerDto>>> GetCustomers(int userId);
}

public class CustomerService : ICustomerService
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public CustomerService(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ServiceResponse<GetCustomerDto>> AddCustomer(
        AddCustomerDto customer,
        int userId
    )
    {
        var response = new ServiceResponse<GetCustomerDto>();
        try
        {
            var insertCustomer = _mapper.Map<Customer>(customer);
            insertCustomer.UserId = userId;
            _context.Add(insertCustomer);
            await _context.SaveChangesAsync();
            var dbCustomer = await _context.Customers.FirstOrDefaultAsync(
                c => c.Email == customer.Email.ToLower()
            );

            if (dbCustomer == null)
                throw new NullReferenceException("dbCustomer");

            response.Data = _mapper.Map<GetCustomerDto>(dbCustomer);
            response.Message = $"Sucessfully added customer {dbCustomer.Name} to database!";
            return response;
        }
        catch (Exception e)
        {
            response.Success = false;
            response.Message = e.Message;
            return response;
        }
    }

    public async Task<ServiceResponse<List<GetCustomerDto>>> GetCustomers(int userId)
    {
        var response = new ServiceResponse<List<GetCustomerDto>>();

        try
        {
            var dbCustomers = await _context.Customers.Where(c => c.UserId == userId).ToListAsync();
            response.Data = dbCustomers.Select(c => _mapper.Map<GetCustomerDto>(c)).ToList();
            response.Message = "Sucessfully fetched all customers from database!";
            return response;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
            return response;
        }
    }
}
