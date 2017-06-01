using System;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class ScenarioResponse
    {
		public MetadataResponse Metadata { get; set; }

		public object Content { get; set; }
	}
}
