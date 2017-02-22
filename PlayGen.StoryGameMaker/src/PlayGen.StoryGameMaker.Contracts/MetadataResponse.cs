using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayGen.StoryGameMaker.Contracts
{
    public class MetadataResponse
    {
		public string Id { get; set; }

		public string Author { get; set; }

		public string Category { get; set; }

		public string Skill { get; set; }

		public string Location { get; set; }

		public string Title { get; set; }
	}
}
