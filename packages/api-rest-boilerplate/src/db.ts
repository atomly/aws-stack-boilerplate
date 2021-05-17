// Dependencies
import { TemplateDBContext, collections } from '@atomly/entities-lib-boilerplate';

export const dbContext = new TemplateDBContext({
  connectionString: process.env.DB_CONNECTION_STRING!,
  collections,
});
