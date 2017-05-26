using System;

namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
	public interface IModificationHistory
	{
		DateTime DateCreated { get; set; }
		DateTime DateModified { get; set; }
	}
}
