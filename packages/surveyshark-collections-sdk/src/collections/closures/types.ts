import { SurveyTypes } from '../../types';
import { BaseDocument } from '../base';
import { SurveyDocument } from '../surveys';

export interface ClosureDocument extends BaseDocument {
  surveyId: SurveyDocument['id'];
  type: SurveyTypes.CLOSURE;
  displayText: string;
}
