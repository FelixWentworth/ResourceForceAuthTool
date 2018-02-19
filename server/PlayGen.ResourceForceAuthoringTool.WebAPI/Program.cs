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
		    SetupDatabase(host);
			host.Run();
			
	    }
	    public static void SetupDatabase(IWebHost host)
	    {
		    using (var scope = host.Services.CreateScope())
		    using (var context = scope.ServiceProvider.GetService<RFContext>())
		    {
			    //context.Database.Migrate();
			    //context.Seed();
		    }
	    }



		public static IWebHost BuildWebHost(string[] args) =>
		    WebHost.CreateDefaultBuilder(args)
			    .UseStartup<Startup>()
				.Build();

    }
}
