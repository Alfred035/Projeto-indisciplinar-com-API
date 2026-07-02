using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models.DTOs.AgendamentoDto
{
    public class AgendamentoCreateDto
    {
        [Required]
        public string Servico { get; set; } = string.Empty;
        [Required]
        public int Preco { get; set; }
        [Required]
        public DateTime Data { get; set; }
        [Required]
        public string Hora { get; set; } = string.Empty;
    }
}
