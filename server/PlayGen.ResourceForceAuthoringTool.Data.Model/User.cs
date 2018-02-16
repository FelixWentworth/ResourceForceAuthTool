using System;
using System.Collections.Generic;
using System.Text;
using MySql.Data.EntityFrameworkCore.DataAnnotations;

namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
    public class User
    {
        public int Id { get; set; }

		public string Username { get; set; }

        public string Password { get; set; }

        public string MemberType { get; set; }

        public string Locations { get; set; }

        public string Languages { get; set; }
    }
}
