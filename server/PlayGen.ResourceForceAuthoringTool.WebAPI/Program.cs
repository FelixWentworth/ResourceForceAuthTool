using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using PlayGen.ResourceForceAuthoringTool.Data.EntityFramework;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public class Program
    {
	    public static void Main(string[] args)
	    {
		    var host = BuildWebHost(args);

		    using (var scope = host.Services.CreateScope())
		    {
			    var dbContext = scope.ServiceProvider.GetService<RFContext>();
				dbContext.Database.Migrate();
				dbContext.Seed();
		    }

			host.Run();
	    }

	    public static IWebHost BuildWebHost(string[] args) =>
		    WebHost.CreateDefaultBuilder(args)
			    .UseStartup<Startup>()
				.Build();

    }
}
