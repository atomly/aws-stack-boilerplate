// Dependencies
import { SurveySharkDBContext, collections } from '@atomly/surveyshark-collections-lib';

export const dbContext = new SurveySharkDBContext({
  connectionString: process.env.DB_CONNECTION_STRING!,
  collections,
});
