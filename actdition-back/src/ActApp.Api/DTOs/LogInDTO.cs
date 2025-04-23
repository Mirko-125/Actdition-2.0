
namespace ActApp.Api.DTOs
{
    public class LogInDto
    {
        public string Identifier { get; set; } = default!;
        public string Passphrase { get; set; } = default!;
    }
}