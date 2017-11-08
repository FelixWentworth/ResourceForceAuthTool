using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using Newtonsoft;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;
using Newtonsoft.Json;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
	public class ScenarioController : DbController
	{
		public ScenarioController(RFContextFactory contextFactory)
			: base(contextFactory)
		{
		}

		public List<Scenario> Get()
		{
			using (var context = ContextFactory.Create())
			{
				var scenario = context.Scenarios.ToList();
				return scenario;
			}
		}

        /// <summary>
        /// Get a scenario by its id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
		public Scenario Get(string id)
		{
			using (var context = ContextFactory.Create())
			{
				var scenario = context.Scenarios.Find(context, id);
				return scenario;
			}
		}

        /// <summary>
        /// Get a list of scenarios by creator Id
        /// </summary>
        /// <param name="id">Creator Id</param>
        /// <returns></returns>
        public List<Scenario> GetByCreator(int id)
        {
            using (var context = ContextFactory.Create())
            {
                var user = context.Users.Find(context, id);
                if (user == null)
                {
                    return null;
                }
                return context.Scenarios.Where(s => s.CreatorId == id).ToList();
           }
        }

        /// <summary>
        /// Get a list of scenarios that a user must validate
        /// </summary>
        /// <param name="id">User is</param>
        /// <returns></returns>
	    public List<Scenario> GetForUserValidation(int id)
	    {
	        using (var context = ContextFactory.Create())
	        {
                var user = context.Users.Find(context, id);
	            if (user == null || user.MemberType == "member")
	            {
                    // invalid user
	                return null;
	            }
	            switch (user.MemberType)
	            {
                    case "admin":
                        // return all scenarios which have been submitted
                        return context.Scenarios.Where(s => s.Submitted).ToList();
                    case "validator":
                        // return all scenarios the user has access to by language and location
                        var locations = JsonConvert.DeserializeObject<List<string>>(user.Locations);
                        var languages = JsonConvert.DeserializeObject<List<string>>(user.Languages);

                        var scenarios = context.Scenarios.Where(s => s.Submitted && locations.Contains(s.Location) && languages.Contains(s.Language)).ToList();

                        return scenarios;
                    default:
                        return null;
	            }

	            {
	                    
	            }
	        }
	    }


        /// <summary>
        /// Get a list of scenarios that match the filter data for language and location
        /// </summary>
        /// <param name="filter">Language and location filter for scenarios</param>
        /// <returns></returns>
        public List<Scenario> GetForValidation (Scenario filter)
        {
            using (var context = ContextFactory.Create())
            {
                var scenarios = context.Scenarios.Where(s => (s.Language == filter.Language || filter.Language == "Any")  && (s.Location == filter.Location || filter.Location == "Any")).ToList();
                return scenarios;
            }
        }

        /// <summary>
        /// Get a scenario using the serial number
        /// </summary>
        /// <param name="number">Serial number</param>
        /// <returns></returns>
        public List<Scenario> Get(long number)
        {
            using (var context = ContextFactory.Create())
            {
                var scenarios = context.Scenarios.Where(s => s.SerialNumber > number && s.IsValid).ToList();
                return scenarios;
            }
        }

        /// <summary>
        /// Get all scenarios that have been approved for a specific language and location
        /// </summary>
        /// <param name="language"></param>
        /// <param name="location"></param>
        /// <returns></returns>
	    public List<Scenario> GetApproved(string language, string location)
	    {
	        using (var context = ContextFactory.Create())
	        {
	            var scenarios = context.Scenarios.Where(s => s.Language == language && s.Location == location && s.IsValid).ToList();
	            return scenarios;
	        }
	    }

		public Scenario Create(Scenario scenario)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Scenarios.Find(context, scenario.Id);

				if (existing != null)
				{
					scenario = Update(scenario, true);
					return scenario;
				}
				context.Scenarios.Add(scenario);
				SaveChanges(context);

				return scenario;
			}
		}

		public Scenario Update(Scenario scenario, bool contentChanged)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Scenarios.Find(context, scenario.Id);

                // Updating valid content will set it ready for review immediately
			    if ((existing.IsValid || existing.Submitted) && contentChanged)
			    {
			        scenario.Submitted = true;
			        scenario.IsValid = false; // content changed so cant assume it is valid
			    }

				if (existing != null)
				{
					context.Entry(existing).State = EntityState.Modified;
					existing.Title = scenario.Title;
					existing.Language = scenario.Language;
					existing.Location = scenario.Location;
					existing.Content = scenario.Content;
                    existing.IsValid = scenario.IsValid;
                    existing.Submitted = scenario.Submitted;
                    existing.Deleted = scenario.Deleted;
                    existing.SerialNumber = scenario.SerialNumber;
				    existing.Comment = scenario.Comment;
					SaveChanges(context);
					return existing;
				}
				throw new Exception("The existing scenario could not be found.");
			}
		}

        public void Delete(string id)
        {
            using (var context = ContextFactory.Create())
            {
                var scenario = context.Scenarios.Find(context, id);
                if (scenario != null)
                {
                    context.Scenarios.Remove(scenario);
                }
                throw new Exception("The existing scenario could not be found"); ;
            }
        }

        //--------------------------------------------------------------------------------

        public long GetNewSerialNumber()
        {
            using (var context = ContextFactory.Create())
            {
                var id = 1;
                var serialNumber = context.SerialNumbers.Find(context, id);
                if (serialNumber != null)
                {
                    var num = ++serialNumber.Number;

                    SaveChanges(context);

                    return num;
                }
                throw new Exception("Unable to find Serial Number");
            }
        }
    }
}