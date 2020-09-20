// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { graphEdgeSchema } from './schema';

export const graphEdgesCollection = new DefaultDBCollection({
  name: 'graph_edges',
  schema: graphEdgeSchema,
  collectionName: 'graph_edges',
});
