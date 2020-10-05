// Types
import { SurveyStatuses, QuestionTypes } from '@atomly/surveyshark-collections-lib';
import { IResolvers } from '../../../types';

export interface IEnumsResolverMap extends IResolvers {
  SurveyStatuses: typeof SurveyStatuses,
  // SurveyTypes: typeof SurveyTypes,
  QuestionTypes: typeof QuestionTypes,
}
