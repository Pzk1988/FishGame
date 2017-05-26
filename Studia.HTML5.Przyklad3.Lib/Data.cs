using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Studia.HTML5.Przyklad3.Lib
{
    public class Data
    {
        public static List<Person> people = new List<Person>()
        {
            new Person() {Name="Amanda", Surname="McIntire", Gender=false,
                Job ="CTO", Photo="Images/pani1.jpg", Age=35 },
            new Person() {Name="Paula", Surname="Anderson", Gender=false,
                Job ="Actress", Photo="Images/pani2.jpg", Age=40 },
            new Person() {Name="Anna", Surname="Greenfield", Gender=false,
                Job ="Marketer", Photo="Images/pani3.jpg", Age=27 },
            new Person() {Name="John", Surname="Smith", Gender=true,
                Job ="Actor", Photo ="Images/pan1.jpg", Age=78 },
            new Person() {Name="Jacob", Surname="McIntire", Gender=true,
                Job ="Salesman", Photo="Images/pan2.jpg", Age=30 },
            new Person() {Name="Paul", Surname="Savage", Gender=true,
                Job ="CEO", Photo="Images/pan3.jpg", Age=40 }
        };

        public static List<Person> People { get { return people; } }
    }
}
