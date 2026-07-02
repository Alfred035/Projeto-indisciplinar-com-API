namespace TodoApi.Models.Entities
{
    public class Usuario
    {
        public Guid Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;

        public ICollection<Agendamento>? Agendamentos { get; set; }
    }
}
