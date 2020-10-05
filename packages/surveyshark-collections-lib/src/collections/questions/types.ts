import { SurveyTypes, QuestionTypes } from '../../types';
import { Base, BaseDocument } from '../base';
import { Survey } from '../surveys';

export interface Question<T = unknown> extends Base {
  surveyId: Survey['uuid'];
  type: SurveyTypes.QUESTION;
  subType: QuestionTypes;
  name: string;
  description?: string;
  data: T;
}

export type QuestionDocument<T = unknown> = Question<T> & BaseDocument;
