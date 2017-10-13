using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
	public class DbController
	{
		protected readonly SGMContextFactory ContextFactory;

		protected DbController(SGMContextFactory contextFactory)
		{
			ContextFactory = contextFactory;
		}

		protected void SaveChanges(DbContext context)
		{
			context.SaveChanges();
		}
	}
}
