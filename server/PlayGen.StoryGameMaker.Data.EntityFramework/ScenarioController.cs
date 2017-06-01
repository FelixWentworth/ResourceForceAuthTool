﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
	public class ScenarioController : DbController
	{
		public ScenarioController(SGMContextFactory contextFactory)
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
        /// Get a scenario using the serial number
        /// </summary>
        /// <param name="number">Serial number</param>
        /// <returns></returns>
        public Scenario Get(long number)
        {
            using (var context = ContextFactory.Create())
            {
                var scenario = context.Scenarios.Find(context, number);
                return scenario;
            }
        }

		public Scenario Create(Scenario scenario)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Scenarios.Find(context, scenario.Id);

				if (existing != null)
				{
					scenario = Update(scenario);
					return scenario;
				}
				context.Scenarios.Add(scenario);
				SaveChanges(context);

				return scenario;
			}
		}

		public Scenario Update(Scenario scenario)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Scenarios.Find(context, scenario.Id);

				if (existing != null)
				{
					context.Entry(existing).State = EntityState.Modified;
					existing.Title = scenario.Title;
					existing.Language = scenario.Language;
					existing.Location = scenario.Location;
					existing.Content = scenario.Content;
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
	}
}