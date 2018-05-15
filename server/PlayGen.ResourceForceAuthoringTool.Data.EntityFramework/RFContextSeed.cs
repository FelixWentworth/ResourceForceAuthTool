using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using PlayGen.ResourceForceAuthoringTool.Data.Model;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public static class RFContextSeed
    {
	    public static void Seed(this RFContext context)
	    {
		    if (context.AllMigrationsApplied())
		    {
                var didMakeModification = false;
		        var serialNumber = new SerialNumber {Number = 0};

		        if (!context.Scenarios.Any(s => s.SerialNumber == serialNumber.Number))
		        {
		            context.SerialNumbers.Add(serialNumber);
		            didMakeModification = true;
		        }

                var adminUser = new User
                {
                    Id = 0,
                    Username = "admin",
                    Password = "073535bb18679f54cc7b64ce3dc1d3d047659731b90c0d44b37a58a5f7c3f015",
                    MemberType = "admin",
                    ContentRegions = "[ \"Lancashire\", \"LondonMetDemo\"]",
                    ValidationRegions = "[ \"Lancashire\", \"LondonMetDemo\"]"
                };

		        if (!context.Users.Any(u => u.Username == adminUser.Username && u.Password == adminUser.Password))
		        {
		            context.Users.Add(adminUser);
		            didMakeModification = true;
		        }

		        if (didMakeModification)
		        {
		            context.SaveChanges();
		        }
		    }
		}

		public static bool AllMigrationsApplied(this Microsoft.EntityFrameworkCore.DbContext context)
		{
		    var applied = context.GetService<IHistoryRepository>()
			    .GetAppliedMigrations()
			    .Select(m => m.MigrationId);

		    var total = context.GetService<IMigrationsAssembly>()
			    .Migrations
			    .Select(m => m.Key);

		    return !total.Except(applied).Any();
	    }

	}
}
