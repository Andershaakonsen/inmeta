using AutoMapper;
using inmeta.Data;
using inmeta.Dtos.Order;
using inmeta.Models;
using Microsoft.EntityFrameworkCore;

namespace inmeta.Services;

public interface IOrderService
{
    public Task<ServiceResponse<GetOrderDto>> AddOrder(
        int userId,
        int customerId,
        AddOrderDto order
    );
    public Task<ServiceResponse<List<GetOrderDto>>> GetOrders(int userId);
    public Task<ServiceResponse<GetOrderDto>> DeleteOrder(int userId, int orderId);
    public Task<ServiceResponse<GetOrderDto>> UpdateOrder(int userId, GetOrderDto order);
}

public class OrderService : IOrderService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public OrderService(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<GetOrderDto>> AddOrder(
        int userId,
        int customerId,
        AddOrderDto order
    )
    {
        var response = new ServiceResponse<GetOrderDto>();
        try
        {
            var insertOrder = _mapper.Map<Order>(order);
            insertOrder.UserId = userId;
            insertOrder.CustomerId = customerId;
            _context.Orders.Add(insertOrder);
            await _context.SaveChangesAsync();

            var dbOrder = await _context.Orders.FirstOrDefaultAsync(
                o => o.UserId == userId && o.CustomerId == customerId && o.Id == insertOrder.Id
            );

            if (dbOrder == null)
            {
                response.Success = false;
                response.Message = "Something went wrong while inserting the order";
                return response;
            }
            response.Message = "Successfully added order to database!";
            response.Data = _mapper.Map<GetOrderDto>(dbOrder);
            return response;
        }
        catch (Exception e)
        {
            response.Success = false;
            response.Message = e.Message;
            return response;
        }
    }

    public async Task<ServiceResponse<GetOrderDto>> DeleteOrder(int userId, int orderId)
    {
        var response = new ServiceResponse<GetOrderDto>();
        try
        {
            var dbOrder = await _context.Orders.FirstOrDefaultAsync(
                o => o.Id == orderId && o.UserId == userId
            );
            if (dbOrder == null)
            {
                response.Message = "Could not find order in database";
                response.Success = false;
                return response;
            }
            _context.Orders.Remove(dbOrder);
            await _context.SaveChangesAsync();
            response.Message = "Successfully removed user from database!";
            response.Data = _mapper.Map<GetOrderDto>(dbOrder);
            return response;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
            return response;
        }
    }

    public async Task<ServiceResponse<List<GetOrderDto>>> GetOrders(int userId)
    {
        var response = new ServiceResponse<List<GetOrderDto>>();
        try
        {
            var dbOrders = await _context.Orders.Where(o => o.UserId == userId).ToListAsync();
            if (dbOrders == null)
            {
                response.Message = "Something went wrong when fetching your orders";
                response.Success = false;
                return response;
            }

            response.Data = dbOrders.Select(o => _mapper.Map<GetOrderDto>(o)).ToList();
            response.Message = "Successfully fetched all orders from db";
            return response;
        }
        catch (Exception e)
        {
            response.Message = e.Message;
            response.Success = false;
            return response;
        }
    }

    public async Task<ServiceResponse<GetOrderDto>> UpdateOrder(int userId, GetOrderDto order)
    {
        var response = new ServiceResponse<GetOrderDto>();
        try
        {
            var dbOrder = await _context.Orders.FirstOrDefaultAsync(
                o => o.Id == order.Id && o.UserId == userId
            );
            if (dbOrder == null)
            {
                response.Message = "Could not find order in database";
                response.Success = false;
                return response;
            }
            //Converts dbOrder variable to order
            _mapper.Map(order, dbOrder);
            await _context.SaveChangesAsync();
            response.Data = order;
            response.Message = "Successfully updated order in database!";
        }
        catch (Exception e)
        {
            response.Success = false;
            response.Message = e.Message;
        }
        return response;
    }
}
