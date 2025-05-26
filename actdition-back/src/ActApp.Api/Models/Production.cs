namespace ActApp.Api.Models
{
    public class Production
    {
        public int Id { get; set; }
        public required string Name { get; set; } // Unique
        public required string Code { get; set; } // Unique
    }
}