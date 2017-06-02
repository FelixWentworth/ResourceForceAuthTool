using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class UserMetadataResponse
    {
        public string Id { get; set; }
        
        public string Username { get; set; }

        public string MemberType { get; set; }

        public string Locations { get; set; }

        public string Languages { get; set; }
    }
}
