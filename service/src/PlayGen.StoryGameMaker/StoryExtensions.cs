using System.Collections.Generic;
using System.Linq;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using PlayGen.StoryGameMaker.Contracts;
using PlayGen.StoryGameMaker.Data.Model;

namespace PlayGen.StoryGameMaker.WebAPI
{
    public static class StoryExtensions
    {
		class Metadata
		{
			public Metadata(string json)
			{
				JObject jObject = JObject.Parse(json);
				Id = (string)jObject["id"];
				Author = (string)jObject["author"];
				Category = (string)jObject["category"];
				Skill = (string)jObject["skill"];
				Location = (string)jObject["location"];
				Title = (string)jObject["title"];
			}

			public string Id { get; set; }
			public string Author { get; set; }
			public string Category { get; set; }
			public string Skill { get; set; }
			public string Location { get; set; }
			public string Title { get; set; }
		}

		public static MetadataResponse ToMetadata(this Story storyModel)
		{
			if (storyModel == null)
			{
				return null;
			}

			return new MetadataResponse
			{
				Id = storyModel.Id,
				Author = storyModel.Author,
				Category = storyModel.Category,
				Skill = storyModel.Skill,
				Location = storyModel.Location,
				Title = storyModel.Title,
			};
		}

		public static IEnumerable<MetadataResponse> ToMetadataList(this IEnumerable<Story> storyModels)
		{
			return storyModels.Select(ToMetadata).ToList();
		}

		public static Story ToStoryModel(this StoryRequest storyContract)
		{
			var metadata = new Metadata(storyContract.Metadata.ToString());
			return new Story
			{
				Id = metadata.Id,
				Author = metadata.Author,
				Category = metadata.Category,
				Skill = metadata.Skill,
				Location = metadata.Location,
				Title = metadata.Title,
				Content = storyContract.Content.ToString()
			};
		}

		public static StoryResponse ToStoryContract(this Story storyModel)
		{
			if (storyModel == null)
			{
				return null;
			}

			var content = JObject.Parse(storyModel.Content);

			return new StoryResponse
			{
				Metadata = storyModel.ToMetadata(),
				Content = content,
			};
		}
	}
}
