using System;

using Microsoft.EntityFrameworkCore;
using PlayGen.ResourceForceAuthoringTool.Data.Model;
using System.Linq;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public class SGMContext : DbContext
    {
		private readonly bool _isSaveDisabled;

		internal SGMContext(DbContextOptions<SGMContext> options, bool disableSave = false) : base(options)
		{
			_isSaveDisabled = disableSave;
		}

		public DbSet<Scenario> Scenarios { get; set; }

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
	}
}
