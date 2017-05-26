using System;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class StoryResponse
    {
		public MetadataResponse Metadata { get; set; }

		public object Content { get; set; }
	}
}
