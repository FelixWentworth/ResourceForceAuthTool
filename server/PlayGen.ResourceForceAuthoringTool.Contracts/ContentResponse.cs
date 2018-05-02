using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class ContentResponse
    {
        public string Id { get; set; }

        public long SerialNumber { get; set; }

        public string Region { get; set; }
        
        public string Language { get; set; }

        public object Content { get; set; }

        public string Comment { get; set; }

        public bool Deleted { get; set; }
    }
}
