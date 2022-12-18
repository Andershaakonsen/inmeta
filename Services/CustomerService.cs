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
    Task<ServiceResponse<GetCustomerDto>> DeleteCustomer(int userId, int customerId);
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
                c => c.Id == insertCustomer.Id
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

    public async Task<ServiceResponse<GetCustomerDto>> DeleteCustomer(int userId, int customerId)
    {
        var response = new ServiceResponse<GetCustomerDto>();
        try
        {
            System.Console.WriteLine("userid:" + userId);
            System.Console.WriteLine("customerId:" + customerId);
            //Returns null if not found
            var dbCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == customerId);
            if (dbCustomer == null)
            {
                response.Success = false;
                response.Message = "Could not find customer in database";
                return response;
            }

            _context.Remove(dbCustomer);
            await _context.SaveChangesAsync();
            response.Data = _mapper.Map<GetCustomerDto>(dbCustomer);
            response.Message = "Sucessfully deleted customer from database";
            return response;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
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
