using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using PlayGen.ResourceForceAuthoringTool.Data.EntityFramework;
using PlayGen.ResourceForceAuthoringTool.Core.Utilities;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
	        Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

	    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
	    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
	    {
		    app.UseMvc();
			app.UseDefaultFiles();
		    app.UseStaticFiles();
		    app.UseCors("AllowAll");

			loggerFactory.AddConsole(Configuration.GetSection("Logging"));
		    loggerFactory.AddDebug();

		    if (env.IsDevelopment())
		    {
			    app.UseDeveloperExceptionPage();
		    }

	        AddTemplateScenarios(app.ApplicationServices);
	    }

        private void AddTemplateScenarios(IServiceProvider appApplicationServices)
        {
            var templateScenariosPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "TemplateScenarios.json");
            var templateScenarioJson = File.ReadAllText(templateScenariosPath);
            var scenarioController = appApplicationServices.GetService<Core.ScenarioController>();
            scenarioController.CreateFromJson(templateScenarioJson);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			// Add framework services.
			services.AddMvc();

			services.AddSingleton((_) => new PasswordEncryption());

			services.AddSingleton<Data.EntityFramework.ScenarioController>();
			services.AddSingleton<Core.ScenarioController>();

			services.AddSingleton<Data.EntityFramework.UserController>();
			services.AddSingleton<Core.UserController>();

			services.AddSingleton<Data.EntityFramework.AccountRequestController>();
			services.AddSingleton<Core.AccountRequestController>();

			services.AddCors(options => options.AddPolicy("AllowAll", p => p
				// TODO: this should be specified in config at each deployment
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.WithExposedHeaders("Authorization ")));

			var connectionString = Configuration.GetConnectionString("DefaultConnection");
	        services.AddSingleton(serviceProvider => new RFContextFactory(connectionString));
	        services.AddDbContext<RFContext>((serviceProvider, options) =>
		        serviceProvider.GetService<RFContextFactory>().ApplyOptions(options));

		}
	}
}
