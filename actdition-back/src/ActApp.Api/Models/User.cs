public class User
{
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

}

public class CastingDirector : User
{

}

public class Producer : User
{

}