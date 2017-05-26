using System;

namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
	public class Story : IModificationHistory
	{
		public string Id { get; set; }

		public string Title { get; set; }

		public string Language { get; set; }

		public string Location { get; set; }

		public string Content { get; set; }

		public DateTime DateCreated { get; set; }

		public DateTime DateModified { get; set; }
	}
}