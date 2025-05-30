
namespace ActApp.Api.DTOs
{
    public class ProducerCompletionDto
    {
        public DateTime Birthdate { get; set; }
        public string Biography { get; set; } = null!;
        public int ProductionId { get; set; }
    }
}