using System;

using Microsoft.EntityFrameworkCore;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class RFContext : DbContext
    {
		private readonly bool _isSaveDisabled;

		internal RFContext(DbContextOptions<RFContext> options, bool disableSave = false) : base(options)
		{
			_isSaveDisabled = disableSave;
		}

		public DbSet<Scenario> Scenarios { get; set; }

        public DbSet<SerialNumber> SerialNumbers { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<AccountRequest> AccountRequests { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Scenario>()
				.Property(p => p.Content)
				.HasColumnType("mediumtext");
		}

		public override int SaveChanges()
		{
			UpdateModificationHistory();

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

        public void Seed()
        {
            SerialNumbers.Add(new SerialNumber { Number = 0 });
            // TODO find better way to do this
            Users.Add(new User
            {
                Id = 0,
                Username = "admin",
                Password = "073535bb18679f54cc7b64ce3dc1d3d047659731b90c0d44b37a58a5f7c3f015",
                MemberType = "admin",
                Locations = "[ \"All\" ]",
                Languages = "[ \"All\" ]"
            });
            SaveChanges();
        }
	}
}
