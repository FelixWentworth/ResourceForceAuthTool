﻿using System.Collections.Generic;
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
				Region = (string)jObject["region"];
                IsValid = (bool)jObject["isValid"];
                Submitted = (bool)jObject["submitted"];
                Deleted = (bool)jObject["deleted"];
				Enabled = (bool)jObject["enabled"];
                Comment = (string)jObject["comment"];
				CompleteContent = (bool) jObject["completeContent"];
			}

            public string Id { get; set; }
            public int CreatorId { get; set; }
			public string Title { get; set; }
			public string Language { get; set; }
			public string Region { get; set; }
            public long SerialNumber { get; set; }
            public bool IsValid { get; set; }
            public bool Submitted { get; set; }
            public bool Deleted { get; set; }
			public bool Enabled { get; set; }
            public string Comment { get; set; }
			public bool CompleteContent { get; set; }
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
                Region = storyModel.Region,
                SerialNumber = storyModel.SerialNumber,
                IsValid = storyModel.IsValid,
                Submitted = storyModel.Submitted,
                Deleted = storyModel.Deleted,
				Enabled = storyModel.Enabled,
                Comment = storyModel.Comment,
				CompleteContent = storyModel.CompleteContent
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
				Region = metadata.Region,
				Content = scenarioContract.Content.ToString(),
				CompleteContent = metadata.CompleteContent
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
                Region = metadata.Region,
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
                Region = scenarioContract.Region,
                Language = scenarioContract.Language,
                Comment = scenarioContract.Comment,
                Deleted = scenarioContract.Deleted,
				Enabled = scenarioContract.Enabled,
                Content = content, 
				CompleteContent = scenarioContract.CompleteContent
            };
        }

        public static Scenario UpdateMetadata(this Scenario scenarioContract, Metadata metadata)
        {
            scenarioContract.Title = metadata.Title;
            scenarioContract.Language = metadata.Language;
            scenarioContract.Region = metadata.Region;

            scenarioContract.IsValid = metadata.IsValid;
            scenarioContract.Submitted = metadata.Submitted;
            scenarioContract.Deleted = metadata.Deleted;
	        scenarioContract.Enabled = metadata.Enabled;
            scenarioContract.Comment = metadata.Comment;

            scenarioContract.SerialNumber = metadata.SerialNumber;

            return scenarioContract;
        }
	}
}
