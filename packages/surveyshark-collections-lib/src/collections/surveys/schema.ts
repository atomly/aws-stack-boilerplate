// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyStatuses } from '../../types';
import { BaseSchema } from '../base';
import { usersCollection } from '../users';
import { graphsCollection } from '../graphs';
import { graphVerticesCollection } from '../graph_vertices';
import { RGB_RGBA_REGEXP } from '../../regexps';
import { getRandomColor } from '../../utils';

// Type
import { SurveyDocument } from './types';

const surveyCustomizationSchema = new Schema({
  color: {
    type: Schema.Types.String,
    match: [RGB_RGBA_REGEXP, 'Invalid RGB/RGBA pattern.'],
    default: getRandomColor(5, 0.5),
  },
});

export const surveySchema = new BaseSchema<SurveyDocument>({
  status: {
    type: Schema.Types.String,
    enum: Object.values(SurveyStatuses),
    default: SurveyStatuses.UNPUBLISHED,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: usersCollection.collectionName,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    default: undefined,
  },
  // collaborators: [{
  //   type: Schema.Types.ObjectId,
  //   ref: usersCollection.collectionName,
  //   required: true,
  // }],
  graph: {
    type: Schema.Types.ObjectId,
    ref: graphsCollection.collectionName,
  },
  startingVertex: {
    type: Schema.Types.ObjectId,
    ref: graphVerticesCollection.collectionName,
    required: function(): boolean {
      const survey = this as SurveyDocument;
      return Boolean(survey.graph?.vertices.length);
    },
  },
  closingVertex: {
    type: Schema.Types.ObjectId,
    ref: graphVerticesCollection.collectionName,
    required: function(): boolean {
      const survey = this as SurveyDocument;
      return Boolean(survey.graph?.vertices.length);
    },
  },
  customization: {
    type: surveyCustomizationSchema,
    required: true,
    default: (): Record<never, never> => ({}),
  },
});
