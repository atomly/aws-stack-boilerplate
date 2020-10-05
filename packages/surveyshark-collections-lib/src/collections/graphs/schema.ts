// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { BaseSchema } from '../base';
import { graphVerticesCollection } from '../graph_vertices';
import { graphEdgesCollection } from '../graph_edges';

// Type
import { GraphDocument } from './types';

export const graphSchema = new BaseSchema<GraphDocument>({
  vertices:  [{
    type: Schema.Types.ObjectId,
    ref: graphVerticesCollection.collectionName,
    index: { dropDups: true },
  }],
  edges: [{
    type: Schema.Types.ObjectId,
    ref: graphEdgesCollection.collectionName,
    index: { dropDups: true },
  }],
});
