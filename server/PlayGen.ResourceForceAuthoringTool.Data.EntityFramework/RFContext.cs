using System;
using Microsoft.EntityFrameworkCore;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;
using MySql.Data.EntityFrameworkCore.Extensions;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class RFContext : DbContext
    {
		private readonly bool _isSaveDisabled;

		public RFContext(DbContextOptions options, bool disableSave = false) : base(options)
		{
			_isSaveDisabled = disableSave;
		}

		public DbSet<Scenario> Scenarios { get; set; }

        public DbSet<SerialNumber> SerialNumbers { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<AccountRequest> AccountRequests { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Scenario>(s =>
			{
				s.ForMySQLHasCollation("utf8_bin");
				s.Property(p => p.Id).HasColumnType("VARCHAR(100)");
				s.Property(p => p.Title).ForMySQLHasCharset("utf8");
				s.Property(p => p.Content).ForMySQLHasCharset("utf8").HasColumnType("mediumtext");
				s.Property(p => p.Comment).ForMySQLHasCharset("utf8");
			});
			modelBuilder.Entity<User>(u =>
			{
				u.ForMySQLHasCollation("utf8_bin");
				u.Property(p => p.Username).ForMySQLHasCharset("utf8").HasMaxLength(40);
			    u.Property(p => p.Password).HasMaxLength(100);
                u.HasIndex(us => us.Username).IsUnique();
			    u.HasIndex(us => new {us.Username, us.Password});
            });
			modelBuilder.Entity<AccountRequest>(a =>
			{
				a.ForMySQLHasCollation("utf8_bin");
				a.Property(p => p.Username).ForMySQLHasCharset("utf8");
				a.Property(p => p.Reason).ForMySQLHasCharset("utf8");
			});
		}

		public override int SaveChanges()
		{
			UpdateModificationHistory();

			//return 0;
			return _isSaveDisabled
				? 0
				: base.SaveChanges();
		}

		private void UpdateModificationHistory()
		{
			var histories = ChangeTracker.Entries()
				.Where(e => e.Entity is IModificationHistory && (e.State == EntityState.Added || e.State == EntityState.Modified))
				.Select(e => e.Entity as IModificationHistory);

			foreach (var history in histories)
			{
				history.DateModified = DateTime.Now;

				if (history.DateCreated == default(DateTime))
				{
					history.DateCreated = DateTime.Now;
				}
			}
		}
	}
}
