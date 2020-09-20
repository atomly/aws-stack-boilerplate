// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Type
import { GraphVertexDocument } from './types';

export const graphVertexSchema = new BaseSchema<GraphVertexDocument>({
  graphId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  key:  {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  value: {
    type: Schema.Types.ObjectId,
    refPath: '_valueCollectionName',
  },
  _valueCollectionName: {
    type: Schema.Types.String,
    required: function(): boolean { return Boolean((this as GraphVertexDocument).value) },
  },
});
