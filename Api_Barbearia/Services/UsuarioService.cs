using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models.DTOs.UsuarioDto;

namespace TodoApi.Services
{
    public class UsuarioService(AppDbContext context)
    {
        public async Task<List<UsuarioResponseDto>> GetAllAsync()
        {
            var usuarios = await context.Usuarios
                .AsNoTracking()
                .ToListAsync();
            return usuarios.Select(u => u.ToResponse()).ToList();
        }

        public async Task<UsuarioResponseDto?> GetByIdAsync(Guid id)
        {
            var usuario = await context.Usuarios
                .FirstOrDefaultAsync(u => u.Id == id);
            return usuario?.ToResponse();
        }

        public async Task<UsuarioResponseDto> CreateAsync(UsuarioCreateDto dto)
        {
            var emailExiste = await context.Usuarios
                .AnyAsync(u => u.Email == dto.Email);

            if (emailExiste)
                throw new Exception("Este e-mail já está cadastrado!");

            var usuario = dto.ToEntity();
            usuario.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

            context.Usuarios.Add(usuario);
            await context.SaveChangesAsync();

            return usuario.ToResponse();
        }
    }
}
