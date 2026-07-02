namespace TodoApi.Models.Entities
{
    public class Agendamento
    {
        public Guid Id { get; set; }
        public string Servico { get; set; } = string.Empty;
        public int Preco { get; set; }
        public DateTime Data { get; set; }       // data do agendamento
        public string Hora { get; set; } = string.Empty;
        public bool Cancelado { get; set; } = false;
        public DateTime CriadoEm { get; set; } = DateTime.UtcNow;

        // FK → Usuario
        public Guid UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }
    }
}
