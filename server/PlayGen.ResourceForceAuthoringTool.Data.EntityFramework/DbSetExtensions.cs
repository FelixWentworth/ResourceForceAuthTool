using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PlayGen.ResourceForceAuthoringTool.Data.EntityFramework
{
    public static class DbSetExtensions
    {
		/// <summary>
		/// Currently Find is missing from the Entity framework Core API.
		/// Fix taken from: http://stackoverflow.com/questions/29030472/dbset-doesnt-have-a-find-method-in-ef7
		/// </summary>
		/// <typeparam name="TEntity"></typeparam>
		/// <param name="set"></param>
		/// <param name="context"></param>
		/// <param name="keyValues"></param>
		/// <returns></returns>
		public static TEntity Find<TEntity>(this IQueryable<TEntity> set, RFContext context, params object[] keyValues) where TEntity : class
		{
			var entityType = context.Model.FindEntityType(typeof(TEntity));
			var key = entityType.FindPrimaryKey();

			var entries = context.ChangeTracker.Entries<TEntity>();

			var i = 0;
			foreach (var property in key.Properties)
			{
				var i1 = i;
				entries = entries.Where(e => e.Property(property.Name).CurrentValue == keyValues[i1]);
				i++;
			}

			var entry = entries.FirstOrDefault();
			if (entry != null)
			{
				// Return the local object if it exists.
				return entry.Entity;
			}

			var parameter = Expression.Parameter(typeof(TEntity), "x");
			var query = set.AsQueryable();
			i = 0;
			foreach (var property in key.Properties)
			{
				var i1 = i;
				query = query.Where((Expression<Func<TEntity, bool>>)
				 Expression.Lambda(
					 Expression.Equal(
						 Expression.Property(parameter, property.Name),
						 Expression.Constant(keyValues[i1])),
					 parameter));
				i++;
			}

			// Look in the database
			return query.FirstOrDefault();
		}
	}
}
