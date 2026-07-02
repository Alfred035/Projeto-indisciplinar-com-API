using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models.DTOs.AgendamentoDto;
using TodoApi.Models.Entities;

namespace TodoApi.Services
{
    public class AgendamentoService(AppDbContext context)
    {
        // Lista todos (para o barbeiro ADM)
        public async Task<List<AgendamentoResponseDto>> GetAllAsync()
        {
            var lista = await context.Agendamentos
                .Include(a => a.Usuario)
                .Where(a => !a.Cancelado)
                .OrderBy(a => a.Data).ThenBy(a => a.Hora)
                .AsNoTracking()
                .ToListAsync();

            return lista.Select(a => a.ToResponse()).ToList();
        }

        // Lista apenas os do usuário logado
        public async Task<List<AgendamentoResponseDto>> GetByUsuarioAsync(Guid usuarioId)
        {
            var lista = await context.Agendamentos
                .Include(a => a.Usuario)
                .Where(a => a.UsuarioId == usuarioId && !a.Cancelado)
                .OrderBy(a => a.Data).ThenBy(a => a.Hora)
                .AsNoTracking()
                .ToListAsync();

            return lista.Select(a => a.ToResponse()).ToList();
        }

        // Retorna horários já ocupados numa data
        public async Task<List<string>> GetHorariosOcupadosAsync(DateTime data)
        {
            return await context.Agendamentos
                .Where(a => a.Data.Date == data.Date && !a.Cancelado)
                .Select(a => a.Hora)
                .ToListAsync();
        }

        // Cria agendamento
        public async Task<AgendamentoResponseDto> CreateAsync(AgendamentoCreateDto dto, Guid usuarioId)
        {
            // Verifica se horário já está ocupado
            var ocupado = await context.Agendamentos
                .AnyAsync(a => a.Data.Date == dto.Data.Date && a.Hora == dto.Hora && !a.Cancelado);

            if (ocupado)
                throw new Exception("Este horário já está reservado.");

            var agendamento = dto.ToEntity(usuarioId);
            context.Agendamentos.Add(agendamento);
            await context.SaveChangesAsync();

            // Recarrega com o usuário para retornar nome/tel
            await context.Entry(agendamento).Reference(a => a.Usuario).LoadAsync();
            return agendamento.ToResponse();
        }

        // Cancela (soft delete)
        public async Task<bool> CancelarAsync(Guid id, Guid usuarioId, bool isAdm)
        {
            var agendamento = await context.Agendamentos.FindAsync(id);
            if (agendamento == null || agendamento.Cancelado) return false;

            // Só o dono ou ADM pode cancelar
            if (!isAdm && agendamento.UsuarioId != usuarioId)
                throw new UnauthorizedAccessException("Você não pode cancelar este agendamento.");

            agendamento.Cancelado = true;
            await context.SaveChangesAsync();
            return true;
        }
    }
}
