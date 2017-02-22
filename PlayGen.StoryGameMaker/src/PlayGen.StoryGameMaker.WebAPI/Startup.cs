using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using PlayGen.StoryGameMaker.Data.EntityFramework;

namespace PlayGen.StoryGameMaker.WebAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

			var connectionString = Configuration.GetConnectionString("DefaultConnection");
			services.AddSingleton(new SGMContextFactory(connectionString));
			services.AddScoped<Data.EntityFramework.StoryController>();
			services.AddScoped<Core.StoryController>();
			services.AddCors(options => options.AddPolicy("AllowAll", p => p
				// TODO: this should be specified in config at each deployment
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.WithExposedHeaders("Authorization ")));
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

			app.Use(async (context, next) =>
			{
				await next();

				if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
				{
					context.Request.Path = "/app/index.html";
					context.Response.StatusCode = 200;
					await next();
				}
			});

			app.UseFileServer();

			app.UseFileServer(new FileServerOptions()
			{
				FileProvider = new PhysicalFileProvider(Path.Combine(env.WebRootPath, "node_modules")),
				RequestPath = "/node_modules",
				EnableDirectoryBrowsing = false
			});

			app.UseCors("AllowAll");
			app.UseStaticFiles();
			app.UseMvc();
		}
    }
}
