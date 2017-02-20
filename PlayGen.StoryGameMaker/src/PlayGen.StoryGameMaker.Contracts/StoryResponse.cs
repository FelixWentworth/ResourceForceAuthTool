using System;

namespace PlayGen.StoryGameMaker.Contracts
{
    public class StoryResponse
    {
		public MetadataResponse Metadata { get; set; }

		public object Content { get; set; }
	}
}
