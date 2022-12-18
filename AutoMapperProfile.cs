using AutoMapper;
using inmeta.Dtos.Customer;
using inmeta.Dtos.Order;
using inmeta.Dtos.User;
using inmeta.Models;

namespace inmeta;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        //User Mappings
        CreateMap<AddUserDto, User>();

        //Customer Mappings
        CreateMap<AddCustomerDto, Customer>();
        CreateMap<Customer, GetCustomerDto>();

        //Order Mappings

        CreateMap<AddOrderDto, Order>();
        CreateMap<Order, GetOrderDto>();
        CreateMap<GetOrderDto, Order>();
    }
}
