using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models.DTOs.AgendamentoDto;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AgendamentosController(AgendamentoService agendamentoService) : ControllerBase
    {
        // Pega o ID do usuário logado a partir do token JWT
        private Guid UsuarioIdLogado =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        // ADM: lista todos | Cliente: só os dele
        // GET /api/agendamentos?todos=true  (só ADM)
        // GET /api/agendamentos             (cliente - lista os dele)
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] bool todos = false)
        {
            if (todos)
                return Ok(await agendamentoService.GetAllAsync());

            return Ok(await agendamentoService.GetByUsuarioAsync(UsuarioIdLogado));
        }

        // Horários ocupados numa data
        // GET /api/agendamentos/ocupados?data=2025-06-25
        [HttpGet("ocupados")]
        public async Task<IActionResult> GetOcupados([FromQuery] DateTime data)
        {
            var horarios = await agendamentoService.GetHorariosOcupadosAsync(data);
            return Ok(horarios);
        }

        // POST /api/agendamentos
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AgendamentoCreateDto dto)
        {
            try
            {
                var resultado = await agendamentoService.CreateAsync(dto, UsuarioIdLogado);
                return CreatedAtAction(nameof(Get), new { id = resultado.Id }, resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE /api/agendamentos/{id}?adm=true
        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancelar(Guid id, [FromQuery] bool adm = false)
        {
            try
            {
                var ok = await agendamentoService.CancelarAsync(id, UsuarioIdLogado, adm);
                return ok ? NoContent() : NotFound();
            }
            catch (UnauthorizedAccessException ex)
            {
                return Forbid();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
