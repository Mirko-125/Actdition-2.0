namespace Actdition
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public char Gender { get; set; }
        public int Phone { get; set; }
        public string EMail { get; set; }
        public string Passphrase { get; set; }
        public int Position { get; set; } // maybe needed
    }

    public class Actor : User
    {
        public double Height { get; set; }
        public double Weight { get; set; }
        public DateTime Birthdate { get; set; }
        public string ProfilePicture { get; set; }
        public string Biography { get; set; }
        public List<Movies> PastMovies { get; set; }

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
        public List<Movies> PastMovies { get; set; }
        public string ProductionCode { get; set; }

    }
}