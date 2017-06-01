using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class MetadataResponse
    {
		public string Id { get; set; }

		public string Title { get; set; }

		public string Language { get; set; }

		public string Location { get; set; }

        public long SerialNumber { get; set; }

	}
}
