using System;

namespace PlayGen.StoryGameMaker.Data.Model
{
	public interface IModificationHistory
	{
		DateTime DateCreated { get; set; }
		DateTime DateModified { get; set; }
	}
}
