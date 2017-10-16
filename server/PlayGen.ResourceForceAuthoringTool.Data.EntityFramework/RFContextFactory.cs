using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MySQL.Data.EntityFrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class RFContextFactory
    {
		private readonly string _connectionString;

		public RFContextFactory(string connectionString = null)
		{
			_connectionString = connectionString;
		}

		public RFContext Create()
		{
			var optionsBuilder = new DbContextOptionsBuilder<RFContext>();
			optionsBuilder.UseMySQL(_connectionString);

			var context = new RFContext(optionsBuilder.Options);
			var newlyCreated = context.Database.EnsureCreated();

			if (newlyCreated)
			{
				context.Seed();
			}

			return context;
		}
	}
}
