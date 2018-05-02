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
                if (request.MemberType == "member")
                {
                    var user = context.Users.FirstOrDefault(u => u.Id == request.PlayerId);
                    if (user != null)
                    {
                        var regions = new List<string>();
                        if (!string.IsNullOrEmpty(user.ContentRegions))
                        {
                            regions = JsonConvert.DeserializeObject<List<string>>(user.ContentRegions);
                        }
                        if (!regions.Contains(request.Region))
                        {
                            regions.Add(request.Region);
                        }

                        user.ContentRegions = JsonConvert.SerializeObject(regions);

                        SaveChanges(context);
                        return request;
                    }
                    throw new Exception($"Unable to find player for id {request.PlayerId} from request with id {request.Id}");
                }
                else
                {
                    var existing = context.AccountRequests.FirstOrDefault(r => r.PlayerId == request.PlayerId && r.Region == request.Region);

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

        public AccountRequest Get(int playerId, string region)
        {
            using (var context = _rfContextFactory.Create())
            {
                return context.AccountRequests.FirstOrDefault(r => r.PlayerId == playerId && r.Region == region);
            }
        }

        public List<AccountRequest> Get(string region)
        {
            using (var context = _rfContextFactory.Create())
            {
                var requests = context.AccountRequests.Where(r => r.Region == region).ToList();
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
                    existing.Region = request.Region;
                    SaveChanges(context);
                    return existing;
                }
                throw new Exception("The existing scenario could not be found.");
            }
        }

        public void Update(string region, AccountRequest request)
        {
            using (var context = _rfContextFactory.Create())
            {
                var user = context.Users.FirstOrDefault(u => u.Id == request.PlayerId);
                if (user != null)
                {
					var regions = new List<string>();
					if (!string.IsNullOrEmpty(user.ValidationRegions))
					{
                        regions = JsonConvert.DeserializeObject<List<string>>(user.ValidationRegions);
					}
					if (!regions.Contains(region))
					{
                        regions.Add(region);
					}

					user.ValidationRegions = JsonConvert.SerializeObject(regions);
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
