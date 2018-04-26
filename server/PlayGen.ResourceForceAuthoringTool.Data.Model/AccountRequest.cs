using MySql.Data.EntityFrameworkCore.DataAnnotations;

namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
	public class AccountRequest
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public string MemberType { get; set; }
        public string Location { get; set; }
        public string Language { get; set; }
        public string Reason { get; set; }
    }
}
