using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class UserMetadataResponse
    {
        public int Id { get; set; }
        
        public string Username { get; set; }

        public string MemberType { get; set; }

        public string ContentRegions { get; set; }

        public string ValidationRegions { get; set; }
    }
}
