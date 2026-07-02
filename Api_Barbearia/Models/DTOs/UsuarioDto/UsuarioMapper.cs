using TodoApi.Models.Entities;

namespace TodoApi.Models.DTOs.UsuarioDto
{
    public static class UsuarioMapper
    {
        public static Usuario ToEntity(this UsuarioCreateDto dto) =>
            new Usuario
            {
                Id       = Guid.NewGuid(),
                Nome     = dto.Nome,
                Email    = dto.Email,
                Telefone = dto.Telefone,
            };

        public static UsuarioResponseDto ToResponse(this Usuario u) =>
            new UsuarioResponseDto
            {
                Id       = u.Id,
                Nome     = u.Nome,
                Email    = u.Email,
                Telefone = u.Telefone,
            };
    }
}
