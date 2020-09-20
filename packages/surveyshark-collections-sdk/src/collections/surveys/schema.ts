// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyStatuses } from '../../types';
import { BaseSchema } from '../base';
import { usersCollection } from '../users';
import { graphsCollection } from '../graphs';
import { graphVerticesCollection } from '../graph_vertices';

// Type
import { SurveyDocument } from './types';

export const surveySchema = new BaseSchema<SurveyDocument>({
  status: {
    type: Schema.Types.String,
    enum: Object.values(SurveyStatuses),
    default: SurveyStatuses.UNPUBLISHED,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: usersCollection.collectionName,
    required: true,
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
});
