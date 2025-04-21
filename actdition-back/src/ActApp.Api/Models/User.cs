using ActApp.Api;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActApp.Api.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }
        public required string Username { get; set; }
        public required char Gender { get; set; }
        public required string Phone { get; set; }
        public required string EMail { get; set; }
        public required string Passphrase { get; set; }
        public required string Position { get; set; }
    }
    /*
    public class Actor : User
    {
        public double Height { get; set; }
        public double Weight { get; set; }
        public DateTime Birthdate { get; set; }
        public string ProfilePicture { get; set; }
        public string Biography { get; set; }
        // public List<Movies> PastMovies { get; set; }

        // list that contains what he did except acting such as writing / directing and producing, look that up more
    }

    public class CastingDirector : User
    {
        public string ProductionCode { get; set; }
    }

    public class Producer : User
    {
        public DateTime Birthdate { get; set; }
        public string ProfilePicture { get; set; }
        public string Biography { get; set; }
        // public List<Movies> PastMovies { get; set; }
        public string ProductionCode { get; set; }

    }
    */
}