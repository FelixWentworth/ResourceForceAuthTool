using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using PlayGen.StoryGameMaker.Contracts;

namespace PlayGen.StoryGameMaker.WebAPI
{
	[Route("api/[controller]")]
	public class StoryController : Controller
	{
		private readonly Core.StoryController _storyCoreController;

		public StoryController(Core.StoryController storyCoreController)
		{
			_storyCoreController = storyCoreController;
		}

		[HttpGet]
		public IActionResult Get()
		{
			var stories = _storyCoreController.Get();
			var metadata = stories.ToMetadataList();
			return new ObjectResult(metadata);
		}

		[HttpGet("{id}")]
		public IActionResult GetById([FromRoute]string id)
		{
			var story = _storyCoreController.Get(id);
			var storyContract = story.ToStoryContract();
			return new ObjectResult(storyContract);
		}

		[HttpPost]
		public IActionResult Create([FromBody]StoryRequest newStory)
		{
			var story = newStory.ToStoryModel();
			_storyCoreController.Create(story);
			var storyContract = story.ToStoryContract();
			return new ObjectResult(storyContract);
		}

		[HttpPut]
		public IActionResult Update([FromBody] StoryRequest story)
		{
			var storyModel = story.ToStoryModel();
			storyModel = _storyCoreController.Update(storyModel);
			var storyContract = storyModel.ToStoryContract();
			return new ObjectResult(storyContract);
		}
	}
}
