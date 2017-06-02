using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class UserController : DbController
    {
        public UserController(SGMContextFactory contextFactory)
			: base(contextFactory)
		{
        }

        public User Create(User user)
        {
            using (var context = ContextFactory.Create())
            {
                var existing = context.Users.Find(context, user.Id);

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
            using (var context = ContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Username == username);
                if (user != null)
                {
                    return user;
                }
                throw new Exception($"Unable to find player with username {username}");
            }
        }

        public User Update(User user)
        {
            using (var context = ContextFactory.Create())
            {
                var existing = context.Users.Find(context, user.Id);

                if (existing != null)
                {
                    existing.MemberType = user.MemberType;
                    existing.Languages = user.Languages;
                    existing.Locations = user.Locations;
                    SaveChanges(context);
                    return existing;
                }
                throw new Exception("The existing scenario could not be found.");
            }
        }
    }
}
