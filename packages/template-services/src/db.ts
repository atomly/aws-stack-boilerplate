// Dependencies
import { TemplateDBContext, collections } from '@atomly/template-collections-lib';

export const dbContext = new TemplateDBContext({
  connectionString: process.env.DB_CONNECTION_STRING!,
  collections,
});
