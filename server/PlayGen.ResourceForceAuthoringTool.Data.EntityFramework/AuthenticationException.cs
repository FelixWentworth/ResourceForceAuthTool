﻿using System;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
	public class AuthenticationException : Exception
	{
		public AuthenticationException()
		{
		}

		public AuthenticationException(string message) : base(message)
		{
		}

		public AuthenticationException(string message, Exception innerException) : base(message, innerException)
		{
		}
	}
}
