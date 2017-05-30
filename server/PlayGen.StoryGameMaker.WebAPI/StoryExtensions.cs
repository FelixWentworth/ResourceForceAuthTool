﻿using System.Collections.Generic;
using System.Linq;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public static class StoryExtensions
    {
		class Metadata
		{
			public Metadata(string json)
			{
				JObject jObject = JObject.Parse(json);
				Id = (string)jObject["id"];
				Title = (string)jObject["title"];
				Language = (string)jObject["language"];
				Location = (string)jObject["location"];
			}

			public string Id { get; set; }
			public string Title { get; set; }
			public string Language { get; set; }
			public string Location { get; set; }
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
				Title = storyModel.Title,
				Language = storyModel.Language,
				Location = storyModel.Location,
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
				Title = metadata.Title,
				Language = metadata.Language,
				Location = metadata.Location,
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