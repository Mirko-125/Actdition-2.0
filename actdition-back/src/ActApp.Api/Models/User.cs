using ActApp.Api;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActApp.Api.Models
{
    public class UserImage
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public byte[] ImageData { get; set; } = Array.Empty<byte>();
        public string ContentType { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual User? User { get; set; }
    }
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // unique
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Username { get; set; } // unique
        public required char Gender { get; set; }
        public required string Phone { get; set; } // unique
        public required string EMail { get; set; } // unique
        public required string Passphrase { get; set; }
        public required string Position { get; set; }
        public virtual UserImage? ProfilePicture { get; set; }
    }

    public class Actor : User
    {
        public required double Height { get; set; }
        public required double Weight { get; set; }
        public required DateTime Birthdate { get; set; }
        public required string Biography { get; set; }
    }

    public class CastingDirector : User
    {
        public int ProductionId { get; set; }
        public Production Production { get; set; } = null!;
    }

    public class Producer : User
    {
        public required DateTime Birthdate { get; set; }
        public required string Biography { get; set; }
        public required Production Production { get; set; }
        public int ProductionId { get; set; }
    }
}