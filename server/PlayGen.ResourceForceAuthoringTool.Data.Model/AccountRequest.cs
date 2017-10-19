namespace PlayGen.ResourceForceAuthoringTool.Data.Model
{
    public class AccountRequest
    {
        public int Id { get; set; }
        public int PlayerId { get; set; }
        public string MemberType { get; set; }
        public string Locations { get; set; }
        public string Languages { get; set; }
        public string Reason { get; set; }
    }
}
