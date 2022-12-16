using inmeta.Models;
using Microsoft.EntityFrameworkCore;

namespace inmeta.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Legger til on delete cascade når tabelet blir laget,
        // dvs at dersom customer blir slettet vil alle orde relatert til denne customeren
        // også bli slettet
        modelBuilder
            .Entity<Customer>()
            .HasMany(c => c.Orders)
            .WithOne(o => o.Customer)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder
            .Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne(o => o.User)
            .OnDelete(DeleteBehavior.NoAction);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
}
