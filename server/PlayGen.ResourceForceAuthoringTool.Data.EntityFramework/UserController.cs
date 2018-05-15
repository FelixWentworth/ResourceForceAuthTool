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

	    public void CreateDefaultUsers()
	    {
		    using (var context = _rfContextFactory.Create())
		    {
				context.Users.Add(new User
				{
					Id = 0,
					Username = "admin",
					Password = "073535bb18679f54cc7b64ce3dc1d3d047659731b90c0d44b37a58a5f7c3f015",
					MemberType = "admin",
					ContentRegions = "[ \"Lancashire\", \"LondonMetDemo\"]",
					ValidationRegions = "[ \"Lancashire\", \"LondonMetDemo\"]"
				});
			    context.SaveChanges();
			}

		}

		public User Create(User user)
        {
            using (var context = _rfContextFactory.Create())
            {
				if (user.Username.Length < 5)
				{
					throw new AccountCreationException("Username is too short.");
				}
				var taken = context.Users.Any(u => u.Username == user.Username);
                if (taken)
                {
                    throw new AccountCreationException("Username already taken.");
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
                throw new AuthenticationException($"Unable to find player with username {username}");
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
                throw new AuthenticationException($"Unable to find player with id {id}");
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
                    existing.ContentRegions = user.ContentRegions;
                    existing.ValidationRegions = user.ValidationRegions;
                    SaveChanges(context);
                    return existing;
                }
                throw new AuthenticationException("The existing scenario could not be found.");
            }
        }
    }
}
