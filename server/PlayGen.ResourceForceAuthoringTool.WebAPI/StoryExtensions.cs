using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using PlayGen.ResourceForceAuthoringTool.Contracts;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public static class StoryExtensions
    {
		public class Metadata
		{
			public Metadata(string json)
			{
				JObject jObject = JObject.Parse(json);
				Id = (string)jObject["id"];

                if ((string)jObject["creatorId"] != null )
                {
                    CreatorId = (int)jObject["creatorId"];
                }
				Title = (string)jObject["title"];
				Language = (string)jObject["language"];
				Location = (string)jObject["location"];
                IsValid = (bool)jObject["isValid"];
                Submitted = (bool)jObject["submitted"];
                Deleted = (bool)jObject["deleted"];
                Comment = (string)jObject["comment"];
            }

            public string Id { get; set; }
            public int CreatorId { get; set; }
			public string Title { get; set; }
			public string Language { get; set; }
			public string Location { get; set; }
            public long SerialNumber { get; set; }
            public bool IsValid { get; set; }
            public bool Submitted { get; set; }
            public bool Deleted { get; set; }
            public string Comment { get; set; }
		}

		public static ScenarioMetadataResponse ToMetadata(this Scenario storyModel)
		{
			if (storyModel == null)
			{
				return null;
			}

            return new ScenarioMetadataResponse
            {
                Id = storyModel.Id,
                CreatorId = storyModel.CreatorId,
                Title = storyModel.Title,
                Language = storyModel.Language,
                Location = storyModel.Location,
                SerialNumber = storyModel.SerialNumber,
                IsValid = storyModel.IsValid,
                Submitted = storyModel.Submitted,
                Deleted = storyModel.Deleted,
                Comment = storyModel.Comment
			};
		}

		public static IEnumerable<ScenarioMetadataResponse> ToMetadataList(this IEnumerable<Scenario> scenarioModels)
		{
			return scenarioModels.Select(ToMetadata).ToList();
		}

		public static Scenario ToScenarioModel(this ScenarioRequest scenarioContract)
		{
			var metadata = new Metadata(scenarioContract.Metadata.ToString());
            return new Scenario
            {
                Id = metadata.Id,
                CreatorId = metadata.CreatorId,
				Title = metadata.Title,
                Submitted = metadata.Submitted,
				Language = metadata.Language,
				Location = metadata.Location,
				Content = scenarioContract.Content.ToString()
			};
		}

        public static Metadata ToScenarioMetadata(this ScenarioRequest scenarioContract)
        {
            var metadata = new Metadata(scenarioContract.Metadata.ToString());
            return metadata;
        }

        public static Scenario ToValidationModel(this ValidationRequest validationContract)
        {
            var metadata = new Metadata(validationContract.Metadata.ToString());
            return new Scenario
            {
                Language = metadata.Language,
                Location = metadata.Location,
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

        public static ContentResponse ToContentContract(this Scenario scenarioContract)
        {
            if (scenarioContract == null)
            {
                return null;
            }

            var content = JObject.Parse(scenarioContract.Content);

            return new ContentResponse
            {
                Id = scenarioContract.Id,
                SerialNumber = scenarioContract.SerialNumber,
                Location = scenarioContract.Location,
                Language = scenarioContract.Language,
                Comment = scenarioContract.Comment,
                Deleted = scenarioContract.Deleted,
                Content = content
            };
        }

        public static Scenario UpdateMetadata(this Scenario scenarioContract, Metadata metadata)
        {
            scenarioContract.Title = metadata.Title;
            scenarioContract.Language = metadata.Language;
            scenarioContract.Location = metadata.Location;

            scenarioContract.IsValid = metadata.IsValid;
            scenarioContract.Submitted = metadata.Submitted;
            scenarioContract.Deleted = metadata.Deleted;
            scenarioContract.Comment = metadata.Comment;

            scenarioContract.SerialNumber = metadata.SerialNumber;

            return scenarioContract;
        }
	}
}
