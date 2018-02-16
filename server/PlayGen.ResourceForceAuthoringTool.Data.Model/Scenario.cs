using System;
using MySql.Data.EntityFrameworkCore.DataAnnotations;

namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
	public class Scenario : IModificationHistory
	{
		public string Id { get; set; }

        public int CreatorId { get; set; }

		public string Title { get; set; }

        public long SerialNumber { get; set; }

		public string Location { get; set; }

        public string Language { get; set; }
        
		public string Content { get; set; }

		public DateTime DateCreated { get; set; }

		public DateTime DateModified { get; set; }

        public bool IsValid { get; set; }

        public bool Deleted { get; set; }

        public bool Submitted { get; set; }

        public string Comment { get; set; }

	}
}