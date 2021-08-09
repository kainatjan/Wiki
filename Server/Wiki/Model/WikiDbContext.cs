using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wiki.Model
{
    public class WikiDbContext : IdentityDbContext<User>
    {
        public WikiDbContext(DbContextOptions<WikiDbContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();//.UseSqlServer(@"data server=.;initial catalog=Wiki;integrated security=true;Trusted_Connection=true;");//base.OnConfiguring(optionsBuilder);
            base.OnConfiguring(optionsBuilder);
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Workspace> Workspaces { get; set; }
        public DbSet<WorkspaceType> WorkspaceType { get; set; }
        public DbSet<Subscription> Subscription { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WorkspaceType>().HasData(new WorkspaceType { Id = 1, TypeName = "Public", isDeleted = false });
            modelBuilder.Entity<WorkspaceType>().HasData(new WorkspaceType { Id = 2, TypeName = "Private", isDeleted = false });
            base.OnModelCreating(modelBuilder);

        }
    }
   
}
