// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyTypes, QuestionTypes } from '../../types';
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Types
import { AnswerDocument } from './types';

export const answerSchema = new BaseSchema<AnswerDocument>({
  surveyId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  parentQuestionId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  type: {
    type: Schema.Types.String,
    default: SurveyTypes.ANSWER,
    match: [new RegExp(`^${SurveyTypes.ANSWER}$`), `Question documents must be of [${SurveyTypes.ANSWER}] type.`],
  },
  subType: {
    type: Schema.Types.String,
    enum: Object.values(QuestionTypes),
  },
  displayText: {
    type: Schema.Types.String,
    required: true,
    default: '',
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});
