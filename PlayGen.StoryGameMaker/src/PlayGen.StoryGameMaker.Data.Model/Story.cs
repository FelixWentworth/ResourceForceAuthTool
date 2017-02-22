using System;

namespace PlayGen.StoryGameMaker.Data.Model
{
	public class Story : IModificationHistory
	{
		public string Id { get; set; }

		public string Author { get; set; }

		public string Category { get; set; }

		public string Skill { get; set; }

		public string Location { get; set; }

		public string Title { get; set; }

		public string Content { get; set; }

		public DateTime DateCreated { get; set; }

		public DateTime DateModified { get; set; }
	}
}