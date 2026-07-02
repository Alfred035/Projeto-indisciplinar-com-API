namespace TodoApi.Models.DTOs.AgendamentoDto
{
    public class AgendamentoResponseDto
    {
        public Guid Id { get; set; }
        public string Servico { get; set; } = string.Empty;
        public int Preco { get; set; }
        public DateTime Data { get; set; }
        public string Hora { get; set; } = string.Empty;
        public bool Cancelado { get; set; }
        public DateTime CriadoEm { get; set; }
        public Guid UsuarioId { get; set; }
        public string NomeUsuario { get; set; } = string.Empty;
        public string TelUsuario { get; set; } = string.Empty;
    }
}
