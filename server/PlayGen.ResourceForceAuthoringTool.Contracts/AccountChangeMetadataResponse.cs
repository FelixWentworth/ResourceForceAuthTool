﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class AccountChangeMetadataResponse
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }

        public string MemberType { get; set; }

        public string Locations { get; set; }

        public string Languages { get; set; }

        public string Reason { get; set; }
    }
}