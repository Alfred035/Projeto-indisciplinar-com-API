using Microsoft.EntityFrameworkCore;
using TodoApi.Models.Entities;

namespace TodoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Agendamento>()
                .HasOne(a => a.Usuario)
                .WithMany(u => u.Agendamentos)
                .HasForeignKey(a => a.UsuarioId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Usuario>().HasData(new Usuario
            {
                Id = Guid.Parse("00000000-0000-0000-0000-000000000001"),
                Nome = "Barbeiro",
                Email = "Barbeiro.123@gmail.com",
                Telefone = "",
                PasswordHash = "$2b$11$4FXhFk9P4Lw/tODcH3wBJ.FteUfQHBUNExg7mHDtf9eG6TD2JMLbK"
            });
        }
    }
}
