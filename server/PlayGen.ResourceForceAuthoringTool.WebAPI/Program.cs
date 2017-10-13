using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
				.UseWebRoot("wwwroot")
				.UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
