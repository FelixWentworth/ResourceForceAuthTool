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
			    context.SerialNumbers.Add(new SerialNumber {Number = 0});
			    // TODO find better way to do this
			    context.Users.Add(new User
			    {
				    Id = 0,
				    Username = "admin",
				    Password = "073535bb18679f54cc7b64ce3dc1d3d047659731b90c0d44b37a58a5f7c3f015",
				    MemberType = "admin",
				    AllowedLocations = "{ \"Belfast\": [ \"Dutch\", \"English\", \"Greek\", \"Spanish\" ], "
										+ "\"Groningen\": [ \"Dutch\", \"English\", \"Greek\", \"Spanish\" ], "
										+ "\"Nicosia\": [ \"Dutch\", \"English\", \"Greek\", \"Spanish\" ], "
										+ "\"Preston\": [ \"Dutch\", \"English\", \"Greek\", \"Spanish\" ], "
										+ "\"Valencia\": [ \"Dutch\", \"English\", \"Greek\", \"Spanish\" ] }"
				});
			    context.SaveChanges();

			}
		}

		public static bool AllMigrationsApplied(this Microsoft.EntityFrameworkCore.DbContext context)
		{
			return true;
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
