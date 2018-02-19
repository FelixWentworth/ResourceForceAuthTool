using System;

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
	    }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
        {
			// Add framework services.
			services.AddMvc();

			services.AddScoped((_) => new PasswordEncryption());

			services.AddScoped<Data.EntityFramework.ScenarioController>();
			services.AddScoped<Core.ScenarioController>();

			services.AddScoped<Data.EntityFramework.UserController>();
			services.AddScoped<Core.UserController>();

			services.AddScoped<Data.EntityFramework.AccountRequestController>();
			services.AddScoped<Core.AccountRequestController>();

			services.AddCors(options => options.AddPolicy("AllowAll", p => p
				// TODO: this should be specified in config at each deployment
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
				.AllowCredentials()
				.WithExposedHeaders("Authorization ")));

			var connectionString = Configuration.GetConnectionString("DefaultConnection");
	        services.AddScoped(serviceProvider => new RFContextFactory(connectionString));
	        services.AddDbContext<RFContext>((serviceProvider, options) =>
		        serviceProvider.GetService<RFContextFactory>().ApplyOptions(options));

		}


	}
}
