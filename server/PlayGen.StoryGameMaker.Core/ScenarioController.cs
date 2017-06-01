﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.Core
{
	public class ScenarioController
	{
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

        public List<Scenario> Get(long id)
        {
            return _scenarioDbController.Get(id);
        }

		public Scenario Create(Scenario newStory)
		{
			return _scenarioDbController.Create(newStory);
		}

		public Scenario Update(Scenario story)
		{
			return _scenarioDbController.Update(story);
		}

        public void Delete(string id)
        {
            _scenarioDbController.Delete(id);
        }
	}
}