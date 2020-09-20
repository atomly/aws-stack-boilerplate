import { SurveyTypes, QuestionTypes } from '../../types';
import { BaseDocument } from '../base';
import { SurveyDocument } from '../surveys';
import { QuestionDocument } from '../questions';

export interface AnswerDocument<T = unknown> extends BaseDocument {
  surveyId: SurveyDocument['id'];
  parentQuestionId: QuestionDocument['id'];
  type: SurveyTypes.ANSWER;
  subType: QuestionTypes;
  displayText: string;
  data: T;
}
