using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Wiki.Model;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Serialization;
using Wiki.Interfaces;
using Wiki.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Wiki.Services;
using Wiki.Hubs;
using System;
//using JavaScriptEngineSwitcher.V8;
//using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
//using React.AspNet;

namespace Wiki
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //SignalR
            //services.AddSignalR();

            //Enable CORS
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowAll", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            //});
            //Session
            // services.AddSession();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(10);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });
            //Json Serialization to keep it default
            services.AddControllersWithViews()
                    .AddNewtonsoftJson(options =>
                     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                    .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            //Enable DbContext
            services.AddDbContext<WikiDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //Enable Controllers
            services.AddControllers();
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowAll", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            //});
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().AllowCredentials().WithOrigins("http://localhost:3000");
                });
            });
            services.AddSignalR();
            services.AddSignalRCore();

            services.AddScoped<IJwtAuthenticationManager, JwtAuthenticationManager>();
            //configure key access

            services.Configure<AppSettings>(Configuration.GetSection(AppSettings.SectionName));


            //JWT Authentication
            var TokenKey = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Key").Value);
            services.AddAuthentication(au =>
            {
                au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(jwt =>
            {
                jwt.RequireHttpsMetadata = false;
                jwt.SaveToken = true;
                jwt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(TokenKey),
                    ValidateIssuer = false,
                    ValidateAudience = false,

                };
            });



            //IOptions
            services.AddOptions();

            //Enable HttpContext : is an object that wraps all http related information into one place.
            //HttpContext.Current : this object holds information about the current HTTP request.
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();


            app.UseSession();
            //app.UseSignalR(e =>
            //{
            //    e.MapHub<NotificationHub>("/NotificationHub");   
            //});
        
            app.UseEndpoints(endpoints =>
            {

                endpoints.MapHub<NotificationHub>("/NotificationHub");
                endpoints.MapControllers();
            });


        }
    }
}
