// Dependencies
import { SurveySharkDBContext , collections } from '../src';

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
export const DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/test?readPreference=primary';

export const dbContext = new SurveySharkDBContext({
  connectionString: DB_CONNECTION_STRING,
  collections,
});
