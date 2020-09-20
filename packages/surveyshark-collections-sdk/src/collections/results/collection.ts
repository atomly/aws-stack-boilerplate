// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { resultSchema } from './schema';

export const resultsCollection = new DefaultDBCollection({
  name: 'results',
  schema: resultSchema,
  collectionName: 'results',
});
