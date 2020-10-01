// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyTypes, QuestionTypes } from '../../types';
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Types
import { QuestionDocument } from './types';

export const questionSchema = new BaseSchema<QuestionDocument>({
  surveyId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  type: {
    type: Schema.Types.String,
    default: SurveyTypes.QUESTION,
    match: [new RegExp(`^${SurveyTypes.QUESTION}$`), `Question documents must be of [${SurveyTypes.QUESTION}] type.`],
    required: true,
  },
  subType: {
    type: Schema.Types.String,
    enum: Object.values(QuestionTypes),
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
    default: '',
  },
  description: {
    type: Schema.Types.String,
    default: undefined,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});
