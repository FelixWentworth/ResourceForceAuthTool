using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class ScenarioMetadataResponse
    {
		public string Id { get; set; }

        public int CreatorId { get; set; }

		public string Title { get; set; }

		public string Language { get; set; }

		public string Location { get; set; }

        public long SerialNumber { get; set; }

        public bool IsValid { get; set; }

        public bool Submitted { get; set; }

        public bool Deleted { get; set; }

		public bool Enabled { get; set; }

        public string Comment { get; set; }
	}
}
