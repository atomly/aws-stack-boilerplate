// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';
import { graphVerticesCollection } from '../graph_vertices';

// Type
import { GraphEdgeDocument } from './types';

export const graphEdgeSchema = new BaseSchema<GraphEdgeDocument>({
  graphId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  from:  {
    type: Schema.Types.ObjectId,
    ref: graphVerticesCollection.collectionName,
  },
  to:  {
    type: Schema.Types.ObjectId,
    ref: graphVerticesCollection.collectionName,
  },
  weight:  {
    type: Number,
    required: false,
  },
});
