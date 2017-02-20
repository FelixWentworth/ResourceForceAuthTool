using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using PlayGen.StoryGameMaker.Data.Model;

namespace PlayGen.StoryGameMaker.Core
{
	public class StoryController
	{
		private readonly Data.EntityFramework.StoryController _storyDbController;

		public StoryController(Data.EntityFramework.StoryController storyDbController)
		{
			_storyDbController = storyDbController;
		}

		public List<Story> Get()
		{
			return _storyDbController.Get();
		}

		public Story Get(string id)
		{
			return _storyDbController.Get(id);
		}

		public Story Create(Story newStory)
		{
			return _storyDbController.Create(newStory);
		}

		public Story Update(Story story)
		{
			return _storyDbController.Update(story);
		}
	}
}
