using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models.DTOs.Auth;
using TodoApi.Models.DTOs.UsuarioDto;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthService _authService;
        private readonly UsuarioService _usuarioService;

        public AuthController(AppDbContext context, AuthService authService, UsuarioService usuarioService)
        {
            _context = context;
            _authService = authService;
            _usuarioService = usuarioService;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioResponseDto>> GetById(Guid id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);
            return usuario is not null ? Ok(usuario) : NotFound();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UsuarioResponseDto>> Post(UsuarioCreateDto dto)
        {
            try
            {
                var novoUsuario = await _usuarioService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = novoUsuario.Id }, novoUsuario);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.PasswordHash))
                return Unauthorized(new { message = "E-mail ou senha inválidos." });

            var token = _authService.GerarToken(usuario);

            // Retorna Id, Nome, Email E Telefone para o app conseguir identificar o usuário
            return Ok(new
            {
                token,
                usuario = new
                {
                    usuario.Id,
                    usuario.Nome,
                    usuario.Email,
                    usuario.Telefone
                }
            });
        }
    }
}
