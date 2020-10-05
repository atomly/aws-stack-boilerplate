// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { graphSchema } from './schema';

export const graphsCollection = new DefaultDBCollection({
  name: 'graphs',
  schema: graphSchema,
  collectionName: 'graphs',
});
