using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class ContentResponse
    {
        public long SerialNumber { get; set; }

        public object Content { get; set; }
    }
}
