// Dependencies
import { TemplateDBContext , collections } from '../src';

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
export const DB_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/template-api-test?readPreference=primary';

export const dbContext = new TemplateDBContext({
  connectionString: DB_CONNECTION_STRING,
  collections,
});
