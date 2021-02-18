// Libraries
import { TemplateDBContext, collections } from '@atomly/template-collections-lib';

/**
 * Returns a TemplateDBContext instance.
 */
export function getDbContext(dbConnectionString: string): TemplateDBContext {
  return new TemplateDBContext({
    connectionString: dbConnectionString,
    collections,
  });
}
