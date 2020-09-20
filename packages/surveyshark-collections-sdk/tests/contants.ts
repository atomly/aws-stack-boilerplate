// Dependencies
import { SurveySharkDBContext , collections } from '../src';

export const DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/?readPreference=primary';
export const dbContext = new SurveySharkDBContext({
  connectionString: DB_CONNECTION_STRING,
  collections,
});
