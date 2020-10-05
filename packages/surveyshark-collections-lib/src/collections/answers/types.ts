import { SurveyTypes, QuestionTypes } from '../../types';
import { Base, BaseDocument } from '../base';
import { Survey } from '../surveys';
import { Question } from '../questions';

export interface Answer<T = unknown> extends Base {
  surveyId: Survey['uuid'];
  parentQuestionId: Question['uuid'];
  type: SurveyTypes.ANSWER;
  subType: QuestionTypes;
  name: string;
  data: T;
}

export type AnswerDocument<T = unknown> = Answer<T> & BaseDocument;
