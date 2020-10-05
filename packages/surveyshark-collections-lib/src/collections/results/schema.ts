// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Type
import { ResultDocument } from './types';
import { questionsCollection } from '../questions';

const resultDataSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: questionsCollection.collectionName,
    required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export const resultSchema = new BaseSchema<ResultDocument>({
  surveyId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  data: [resultDataSchema],
  identifier: {
    type: Schema.Types.String,
    // required: true,
    // match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
});
