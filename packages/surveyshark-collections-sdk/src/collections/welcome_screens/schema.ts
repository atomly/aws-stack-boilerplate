// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { SurveyTypes } from '../../types';
import { UUID_V4_REGEXP } from '../../regexps';
import { BaseSchema } from '../base';

// Types
import { WelcomeScreenDocument } from './types';

export const welcomeScreenSchema = new BaseSchema<WelcomeScreenDocument>({
  surveyId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  type: {
    type: Schema.Types.String,
    default: SurveyTypes.WELCOME_SCREEN,
    match: [new RegExp(`^${SurveyTypes.WELCOME_SCREEN}$`), `Question documents must be of [${SurveyTypes.WELCOME_SCREEN}] type.`],
  },
  displayText: {
    type: Schema.Types.String,
    required: true,
    default: '',
  },
});
