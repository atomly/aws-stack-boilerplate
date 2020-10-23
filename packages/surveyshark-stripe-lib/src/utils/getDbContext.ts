// Libraries
import { SurveySharkDBContext, collections } from '@atomly/surveyshark-collections-lib';

/**
 * Returns a SurveySharkDBContext instance.
 */
export function getDbContext(dbConnectionString: string): SurveySharkDBContext {
  return new SurveySharkDBContext({
    connectionString: dbConnectionString,
    collections,
  });
}
