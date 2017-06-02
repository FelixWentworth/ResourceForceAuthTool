using System;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class ScenarioResponse
    {
		public ScenarioMetadataResponse Metadata { get; set; }

		public object Content { get; set; }
	}
}
