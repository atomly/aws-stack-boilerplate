// Libraries
import { TemplateDBContext, collections } from '@atomly/entities-lib-boilerplate';

/**
 * Returns a TemplateDBContext instance.
 */
export function getDbContext(dbConnectionString: string): TemplateDBContext {
  return new TemplateDBContext({
    connectionString: dbConnectionString,
    collections,
  });
}
