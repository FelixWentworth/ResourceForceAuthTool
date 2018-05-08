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
		private readonly RFContextFactory _rfContextFactory;

		public ScenarioController(RFContextFactory contextFactory)
			: base(contextFactory)
		{
			_rfContextFactory = contextFactory;
		}

		public List<Scenario> Get()
		{
			using (var context = _rfContextFactory.Create())
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
			using (var context = _rfContextFactory.Create())
			{
				var scenario = context.Scenarios.Find(id);
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
            using (var context = _rfContextFactory.Create())
            {
		        var user = context.Users.Find(id);
		        if (user == null)
		        {
			        return null;
		        }
	            return context.Scenarios.Where(s => s.CreatorId == id || s.CreatorId == -1).ToList();
           }
        }

        /// <summary>
        /// Get a list of scenarios that a user must validate
        /// </summary>
        /// <param name="id">User is</param>
        /// <returns></returns>
	    public List<Scenario> GetForUserValidation(int id)
	    {
	        using (var context = _rfContextFactory.Create())
	        {
                var user = context.Users.Find(id);
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
                        // return all scenarios the user has access to by region and language
                        var regions = JsonConvert.DeserializeObject<List<string>>(user.ValidationRegions);

						var scenarios = context.Scenarios.Where(s => s.Submitted && regions.Contains(s.Region)).ToList();
						return scenarios;
					default:
                        return null;
	            }
	        }
	    }


        /// <summary>
        /// Get a list of scenarios that match the filter data for region and language
        /// </summary>
        /// <param name="filter">Language and region filter for scenarios</param>
        /// <returns></returns>
        public List<Scenario> GetForValidation (Scenario filter)
        {
            using (var context = _rfContextFactory.Create())
            {
                var scenarios = context.Scenarios.Where(s => (s.Language == filter.Language || filter.Language == "Any")  && (s.Region == filter.Region || filter.Region == "Any")).ToList();
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
            using (var context = _rfContextFactory.Create())
            {
                var scenarios = context.Scenarios.Where(s => s.SerialNumber > number && s.IsValid).ToList();
                return scenarios;
            }
        }

        /// <summary>
        /// Get all scenarios that have been approved for a specific language and region
        /// </summary>
        /// <param name="language"></param>
        /// <param name="region"></param>
        /// <returns></returns>
	    public List<Scenario> GetApproved(string language, string region)
	    {
	        using (var context = _rfContextFactory.Create())
	        {
	            var scenarios = context.Scenarios.Where(s => s.Language == language && s.Region == region && s.IsValid).ToList();
	            return scenarios;
	        }
	    }

		public Scenario Create(Scenario scenario)
		{
			using (var context = _rfContextFactory.Create())
			{
				var existing = context.Scenarios.Find(scenario.Id);

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
			using (var context = _rfContextFactory.Create())
			{
				var existing = context.Scenarios.Find(scenario.Id);

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
					existing.Region = scenario.Region;
					existing.Content = scenario.Content;
                    existing.IsValid = scenario.IsValid;
                    existing.Submitted = scenario.Submitted;
                    existing.Deleted = scenario.Deleted;
					existing.Enabled = scenario.Enabled;
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
            using (var context = _rfContextFactory.Create())
            {
                var scenario = context.Scenarios.Find(id);
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
            using (var context = _rfContextFactory.Create())
            {
                var id = 1;
                var serialNumber = context.SerialNumbers.Find(id);
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