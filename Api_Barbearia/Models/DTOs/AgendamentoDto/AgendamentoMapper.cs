using TodoApi.Models.Entities;

namespace TodoApi.Models.DTOs.AgendamentoDto
{
    public static class AgendamentoMapper
    {
        public static Agendamento ToEntity(this AgendamentoCreateDto dto, Guid usuarioId) =>
            new Agendamento
            {
                Servico   = dto.Servico,
                Preco     = dto.Preco,
                Data      = dto.Data,
                Hora      = dto.Hora,
                UsuarioId = usuarioId,
            };

        public static AgendamentoResponseDto ToResponse(this Agendamento a) =>
            new AgendamentoResponseDto
            {
                Id          = a.Id,
                Servico     = a.Servico,
                Preco       = a.Preco,
                Data        = a.Data,
                Hora        = a.Hora,
                Cancelado   = a.Cancelado,
                CriadoEm   = a.CriadoEm,
                UsuarioId   = a.UsuarioId,
                NomeUsuario = a.Usuario?.Nome ?? string.Empty,
                TelUsuario  = a.Usuario?.Telefone ?? string.Empty,
            };
    }
}
