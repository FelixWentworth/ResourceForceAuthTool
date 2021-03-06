﻿using System;
using System.Collections.Generic;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Contracts
{
    public class AccountChangeMetadataResponse
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }

		public string Username { get; set; }

        public string MemberType { get; set; }

        public string Region { get; set; }

        public string Reason { get; set; }
    }
}
