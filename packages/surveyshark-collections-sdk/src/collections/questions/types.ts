import { SurveyTypes, QuestionTypes } from '../../types';
import { BaseDocument } from '../base';
import { SurveyDocument } from '../surveys';

export interface QuestionDocument<T = unknown> extends BaseDocument {
  surveyId: SurveyDocument['id'];
  type: SurveyTypes.QUESTION;
  subType: QuestionTypes;
  displayText: string;
  data: T;
}
