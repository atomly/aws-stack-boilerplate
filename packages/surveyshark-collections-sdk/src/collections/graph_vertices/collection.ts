// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { graphVertexSchema } from './schema';

export const graphVerticesCollection = new DefaultDBCollection({
  name: 'graph_vertices',
  schema: graphVertexSchema,
  collectionName: 'graph_vertices',
});
