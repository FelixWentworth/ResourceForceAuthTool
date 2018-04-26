using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class AccountRequestController : DbController
    {
	    private readonly RFContextFactory _rfContextFactory;

		public AccountRequestController(RFContextFactory contextFactory)
            : base(contextFactory)
        {
	        _rfContextFactory = contextFactory;
        }

        public AccountRequest Create(AccountRequest request)
        {
            using (var context = _rfContextFactory.Create())
            {
                var existing =
                    context.AccountRequests.FirstOrDefault(
                        r => r.PlayerId == request.PlayerId && r.Language == request.Language &&
                             r.Location == request.Location);

                if (existing != null)
                {
                    request = Update(existing);
                    return request;
                }
                context.AccountRequests.Add(request);
                SaveChanges(context);

                return request;
            }
        }

        

        public List<AccountRequest> Get()
        {
            using (var context = _rfContextFactory.Create())
            {
                return context.AccountRequests.ToList();
            }
        }

        public AccountRequest Get(int id)
        {
            using (var context = _rfContextFactory.Create())
            {
                return context.AccountRequests.FirstOrDefault(r => r.Id == id);
            }
        }

        public AccountRequest Get(int playerId, string location, string language)
        {
            using (var context = _rfContextFactory.Create())
            {
                return context.AccountRequests.FirstOrDefault(r => r.PlayerId == playerId && r.Location == location && r.Language == language);
            }
        }

        public List<AccountRequest> Get(string location, string language)
        {
            using (var context = _rfContextFactory.Create())
            {
                var requests = context.AccountRequests.Where(r => r.Language == language && r.Location == location).ToList();
                if (requests.Count > 0)
                {
                    return requests;
                }
                return null;
            }
        }

        public List<AccountRequest> GetForPlayer(int playerId)
        {
            using (var context = _rfContextFactory.Create())
            {
                var requests = context.AccountRequests.Where(u => u.PlayerId == playerId).ToList();
                if (requests.Count > 0)
                {
                    return requests;
                }
                throw new Exception($"Unable to find requests for player with id {playerId}");
            }
        }

        public AccountRequest Update(AccountRequest request)
        {
            using (var context = _rfContextFactory.Create())
            {
                var existing = context.AccountRequests.Find(request.Id);

                if (existing != null)
                {
                    existing.PlayerId = request.PlayerId;
                    existing.MemberType = request.MemberType;
                    existing.Language = request.Language;
                    existing.Location = request.Location;
                    SaveChanges(context);
                    return existing;
                }
                throw new Exception("The existing scenario could not be found.");
            }
        }

        public void Update(string location, string language, AccountRequest request)
        {
            using (var context = _rfContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Id == request.PlayerId);
                if (user != null)
                {
					var locations = new Dictionary<string, List<string>>();
					if (!string.IsNullOrEmpty(user.AllowedLocations))
					{
						locations = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(user.AllowedLocations);
					}
					if (!locations.ContainsKey(location))
					{
						locations.Add(location, new List<string> { language });
					}
					else
					{
						if (!locations[location].Contains(language))
						{
							locations[location].Add(language);
						}
					}

					user.AllowedLocations = JsonConvert.SerializeObject(locations);
					if (user.MemberType != "admin")
					{
						user.MemberType = request.MemberType;
					}

                    SaveChanges(context);
                    return;
                }
                throw new Exception($"Unable to find player for id {request.PlayerId} from request with id {request.Id}");
            }
        }

        public void Delete(int id)
        {
            using (var context = _rfContextFactory.Create())
            {
                var request = context.AccountRequests.Find(id);
                if (request != null)
                {
                    context.Remove(request);
                    SaveChanges(context);
                    return;
                }
                throw new Exception($"No Request found with id {id}");
            }
        }

    }
}
