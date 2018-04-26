using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.Core
{
	public class ScenarioController
	{
        public static readonly int TemplateScenarioCreatorId = -1;

		private readonly Data.EntityFramework.ScenarioController _scenarioDbController;

		public ScenarioController(Data.EntityFramework.ScenarioController storyDbController)
		{
			_scenarioDbController = storyDbController;
		}

		public List<Scenario> Get()
		{
			return _scenarioDbController.Get();
		}

		public Scenario Get(string id)
		{
			return _scenarioDbController.Get(id);
		}

        public List<Scenario> GetByCreator(int id)
        {
            return _scenarioDbController.GetByCreator(id);
        }

	    public List<Scenario> GetForUserValidation(int id)
	    {
	        return _scenarioDbController.GetForUserValidation(id);
	    }

        public List<Scenario> GetForValidation(Scenario filter)
        {
            return _scenarioDbController.GetForValidation(filter);
        }

        public List<Scenario> Get(long id)
        {
            return _scenarioDbController.Get(id);
        }

	    public List<Scenario> GetApproved(string language, string location)
	    {
	        return _scenarioDbController.GetApproved(language, location);
	    }

        public Scenario Create(Scenario newStory)
		{
			return _scenarioDbController.Create(newStory);
		}

		public Scenario Update(Scenario story, bool contentChanged)
		{
			return _scenarioDbController.Update(story, contentChanged);
		}

        public void Delete(string id)
        {
            _scenarioDbController.Delete(id);
        }

        //-------------------------------------------------------

        public long GetNewSerialNumber()
        {
            return _scenarioDbController.GetNewSerialNumber();
        }

        public static List<TemplateScenario> Parse(string serializedScenarios)
	    {
	        var templateScenarios = new List<TemplateScenario>();

	        foreach (var jScenario in JArray.Parse(serializedScenarios))
	        {
	            var id = jScenario["id"].Value<string>();
	            var language = jScenario["language"].Value<string>();
	            var location = jScenario["location"].Value<string>();
	            var serialNumber = jScenario["serialNumber"].Value<int>();
	            var content = jScenario["content"].ToString();

	            templateScenarios.Add(new TemplateScenario
	            {
	                Id = id,
	                Language = language,
	                Location = location,
	                SerialNumber = serialNumber,
	                Content = content
	            });
	        }

	        return templateScenarios;
	    }

	    public void CreateFromJson(string templateScenarioJson)
	    {
	        var templateScenarios = Parse(templateScenarioJson);
	        CreateTemplateScenarios(templateScenarios);
	    }

	    public void CreateTemplateScenarios(List<TemplateScenario> templateScenarios)
        { 
	        var scenarioIndex = 0;
	        foreach (var scenario in templateScenarios)
	        {
	            Create(new Scenario
	            {
	                Id = scenario.Id,
	                Location = scenario.Location,
	                Language = scenario.Language,
	                Content = scenario.Content,
	                SerialNumber = scenario.SerialNumber,

	                Title = $"Template Scenario {scenarioIndex + 1}",
	                CreatorId = TemplateScenarioCreatorId,
                    IsValid = true
	            });

	            scenarioIndex++;
	        }
        }
	}
}
