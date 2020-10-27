// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyTypes } from '../../types';
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Types
import { ClosureDocument } from './types';

export const closureSchema = new BaseSchema<ClosureDocument>({
  surveyId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  type: {
    type: Schema.Types.String,
    default: SurveyTypes.CLOSURE,
    match: [new RegExp(`^${SurveyTypes.CLOSURE}$`), `Question documents must be of [${SurveyTypes.CLOSURE}] type.`],
    required: true,
  },
  name: {
    type: Schema.Types.String,
    default: undefined,
  },
  description: {
    type: Schema.Types.String,
    default: undefined,
  },
});
