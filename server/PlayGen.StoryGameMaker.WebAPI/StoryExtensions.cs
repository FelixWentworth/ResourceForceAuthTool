using System.Collections.Generic;
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
            public long SerialNumber { get; set; }
		}

		public static MetadataResponse ToMetadata(this Scenario storyModel)
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
                SerialNumber = storyModel.SerialNumber
			};
		}

		public static IEnumerable<MetadataResponse> ToMetadataList(this IEnumerable<Scenario> scenarioModels)
		{
			return scenarioModels.Select(ToMetadata).ToList();
		}

		public static Scenario ToScenarioModel(this ScenarioRequest scenarioContract)
		{
			var metadata = new Metadata(scenarioContract.Metadata.ToString());
			return new Scenario
			{
				Id = metadata.Id,
				Title = metadata.Title,
				Language = metadata.Language,
				Location = metadata.Location,
				Content = scenarioContract.Content.ToString()
			};
		}

		public static ScenarioResponse ToScenarioContract(this Scenario scenarioContract)
		{
			if (scenarioContract == null)
			{
				return null;
			}

			var content = JObject.Parse(scenarioContract.Content);

			return new ScenarioResponse
			{
				Metadata = scenarioContract.ToMetadata(),
				Content = content,
			};
		}
	}
}
