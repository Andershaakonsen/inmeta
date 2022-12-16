using AutoMapper;
using inmeta.Dtos.Customer;
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
    }
}
