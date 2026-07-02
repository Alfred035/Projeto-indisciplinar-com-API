using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models.DTOs.UsuarioDto
{
    public class UsuarioCreateDto
    {
        [Required] public string Nome  { get; set; } = string.Empty;
        [Required, EmailAddress] public string Email { get; set; } = string.Empty;
        [Required] public string Senha { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
    }
}
