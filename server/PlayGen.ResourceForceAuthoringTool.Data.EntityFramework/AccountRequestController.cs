using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class AccountRequestController : DbController
    {
        public AccountRequestController(RFContextFactory contextFactory)
            : base(contextFactory)
        {
        }

        public AccountRequest Create(AccountRequest request)
        {
            using (var context = ContextFactory.Create())
            {
                var existing =
                    context.AccountRequests.FirstOrDefault(
                        r => r.PlayerId == request.PlayerId && r.Languages == request.Languages &&
                             r.Locations == request.Locations);

                if (existing != null)
                {
                    request = Update(request);
                    return request;
                }
                context.AccountRequests.Add(request);
                SaveChanges(context);

                return request;
            }
        }

        

        public List<AccountRequest> Get()
        {
            using (var context = ContextFactory.Create())
            {
                return context.AccountRequests.ToList();
            }
        }

        public AccountRequest Get(int id)
        {
            using (var context = ContextFactory.Create())
            {
                return context.AccountRequests.FirstOrDefault(r => r.Id == id);
            }
        }

        public AccountRequest Get(int playerId, string location, string language)
        {
            using (var context = ContextFactory.Create())
            {
                return context.AccountRequests.FirstOrDefault(r => r.PlayerId == playerId && r.Locations == location && r.Languages == language);
            }
        }

        public List<AccountRequest> Get(string location, string language)
        {
            using (var context = ContextFactory.Create())
            {
                var requests = context.AccountRequests.Where(r => r.Languages == language && r.Locations == location).ToList();
                if (requests.Count > 0)
                {
                    return requests;
                }
                throw new Exception($"Unable to find any requests in {location} with language {language}");
            }
        }

        public List<AccountRequest> GetForPlayer(int playerId)
        {
            using (var context = ContextFactory.Create())
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
            using (var context = ContextFactory.Create())
            {
                var existing = context.AccountRequests.Find(context, request.Id);

                if (existing != null)
                {
                    existing.PlayerId = request.PlayerId;
                    existing.MemberType = request.MemberType;
                    existing.Languages = request.Languages;
                    existing.Locations = request.Locations;
                    SaveChanges(context);
                    return existing;
                }
                throw new Exception("The existing scenario could not be found.");
            }
        }

        public void Update(string location, string language, AccountRequest request)
        {
            using (var context = ContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Id == request.PlayerId);
                if (user != null)
                {
                    var languages = JsonConvert.DeserializeObject<List<string>>(user.Languages);
                    var locations = JsonConvert.DeserializeObject<List<string>>(user.Locations);

                    if (!languages.Contains(language))
                    {
                        languages.Add(language);
                    }
                    if (!locations.Contains(location))
                    {
                        locations.Add(location);
                    }

                    user.Languages = JsonConvert.SerializeObject(languages);
                    user.Locations = JsonConvert.SerializeObject(locations);
                    user.MemberType = request.MemberType;

                    SaveChanges(context);
                    return;
                }
                throw new Exception($"Unable to find player for id {request.PlayerId} from request with id {request.Id}");
            }
        }

        public void Delete(int id)
        {
            using (var context = ContextFactory.Create())
            {
                var request = context.AccountRequests.Find(context, id);
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
