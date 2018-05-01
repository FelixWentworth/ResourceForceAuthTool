using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

using PlayGen.ResourceForceAuthoringTool.Data.EntityFramework;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
	public class ExceptionFilter : ExceptionFilterAttribute
	{
		public override void OnException(ExceptionContext context)
		{
			var exception = context.Exception;

			switch (exception)
			{
				case AuthenticationException authException:
					context.Result = new ObjectResult("Invalid details provided.");
					context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
					break;

				case AccountCreationException accException:
					context.Result = new ObjectResult(accException.Message);
					context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Conflict;
					break;

				default:
					context.Result = new ObjectResult(context.Exception.Message);
					context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
					break;
			}

			context.Exception = null;
			base.OnException(context);
		}
	}
}
