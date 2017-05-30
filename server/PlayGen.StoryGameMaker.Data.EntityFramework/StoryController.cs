﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
	public class StoryController : DbController
	{
		public StoryController(SGMContextFactory contextFactory)
			: base(contextFactory)
		{
		}

		public List<Story> Get()
		{
			using (var context = ContextFactory.Create())
			{
				var games = context.Stories.ToList();
				return games;
			}
		}

		public Story Get(string id)
		{
			using (var context = ContextFactory.Create())
			{
				var game = context.Stories.Find(context, id);
				return game;
			}
		}

		public Story Create(Story story)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Stories.Find(context, story.Id);

				if (existing != null)
				{
					story = Update(story);
					return story;
				}
				context.Stories.Add(story);
				SaveChanges(context);

				return story;
			}
		}

		public Story Update(Story story)
		{
			using (var context = ContextFactory.Create())
			{
				var existing = context.Stories.Find(context, story.Id);

				if (existing != null)
				{
					context.Entry(existing).State = EntityState.Modified;
					existing.Title = story.Title;
					existing.Language = story.Language;
					existing.Location = story.Location;
					existing.Content = story.Content;
					SaveChanges(context);
					return existing;
				}
				throw new Exception("The existing story could not be found.");
			}
		}
	}
}