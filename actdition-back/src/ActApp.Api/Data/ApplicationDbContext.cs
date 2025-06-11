using Microsoft.EntityFrameworkCore;
using ActApp.Api.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<UserImage> UserImages { get; set; }
    public DbSet<Production> Productions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasDiscriminator(u => u.Position)
            .HasValue<User>("user")
            .HasValue<Actor>("actor")
            .HasValue<Producer>("producer")
            .HasValue<CastingDirector>("castingdirector");

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.EMail)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Phone)
            .IsUnique();

        modelBuilder.Entity<Production>()
            .HasIndex(p => p.Name)
            .IsUnique();

        modelBuilder.Entity<User>()
            .HasOne(u => u.ProfilePicture)
            .WithOne(i => i.User)
            .HasForeignKey<UserImage>(i => i.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Producer>()
            .HasOne(p => p.Production)
            .WithMany()
            .HasForeignKey(p => p.ProductionId)
            .IsRequired();

        modelBuilder.Entity<CastingDirector>()
            .HasOne(cd => cd.Production)
            .WithMany()
            .HasForeignKey(cd => cd.ProductionId)
            .IsRequired();

        modelBuilder.Entity<CastingDirector>()
            .HasIndex(cd => cd.ProductionId)
            .IsUnique(false);
    }
}