using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class RFContextFactory
    {
		private readonly string _connectionString;
		private readonly DbContextOptions _options;

		public RFContextFactory(string connectionString = null)
		{
			_connectionString = connectionString;
			_options = ApplyOptions(new DbContextOptionsBuilder()).Options;
		}

		public RFContext Create()
		{
			return new RFContext(_options);
			//var optionsBuilder = new DbContextOptionsBuilder<RFContext>();
			//optionsBuilder.UseMySQL(_connectionString);

			//var context = new RFContext(optionsBuilder.Options);
			//var newlyCreated = context.Database.EnsureCreated();

			//if (newlyCreated)
			//{
			//	context.Seed();
			//}

			//return context;
		}

	    public DbContextOptionsBuilder ApplyOptions(DbContextOptionsBuilder options)
		{
		    options.UseMySQL(_connectionString);
		    options.EnableSensitiveDataLogging();
		    return options;
	    }

	}
}
