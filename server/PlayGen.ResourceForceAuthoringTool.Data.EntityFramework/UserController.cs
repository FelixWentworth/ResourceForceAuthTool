using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class UserController : DbController
    {
	    private readonly RFContextFactory _rfContextFactory;

        public UserController(RFContextFactory contextFactory)
			: base(contextFactory)
        {
	        _rfContextFactory = contextFactory;
        }

        public User Create(User user)
        {
            using (var context = _rfContextFactory.Create())
            {
				if (user.Username.Length < 5)
				{
					throw new Exception("Username is too short");
				}
				var taken = context.Users.Any(u => u.Username == user.Username);
                if (taken)
                {
                    throw new Exception("Username already taken");
                }
                var existing = context.Users.FirstOrDefault(u => u.Id == user.Id);

                if (existing != null)
                {
                    user = Update(user);
                    return user;
                }
                context.Users.Add(user);    
                SaveChanges(context);

                return user;
            }
        }

        public User Get(string username)
        {
            using (var context = _rfContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Username == username);
                if (user != null)
                {
                    return user;
                }
                throw new Exception($"Unable to find player with username {username}");
            }
        }
        public User Get(int id)
        {
            using (var context = _rfContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Id == id);
                if (user != null)
                {
                    return user;
                }
                throw new Exception($"Unable to find player with id {id}");
            }
        }
        public User Update(User user)
        {
            using (var context = _rfContextFactory.Create())
            {
                var existing = context.Users.Find(user.Id);

                if (existing != null)
                {
                    existing.MemberType = user.MemberType;
                    existing.AllowedLocations = user.AllowedLocations;
                    SaveChanges(context);
                    return existing;
                }
                throw new Exception("The existing scenario could not be found.");
            }
        }
    }
}
