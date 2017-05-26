using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MySQL.Data.EntityFrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class SGMContextFactory
    {
		private readonly string _connectionString;

		public SGMContextFactory(string connectionString = null)
		{
			_connectionString = connectionString;
		}

		public SGMContext Create()
		{
			var optionsBuilder = new DbContextOptionsBuilder<SGMContext>();
			optionsBuilder.UseMySQL(_connectionString);

			var context = new SGMContext(optionsBuilder.Options);
			var newlyCreated = context.Database.EnsureCreated();

			if (newlyCreated)
			{
				//context.Seed();
			}

			return context;
		}
	}
}
