// Libraries
import { SurveyStatuses, SurveyTypes, QuestionTypes } from '@atomly/surveyshark-collections-lib';

// Types
import { IEnumsResolverMap } from './types';

const resolvers: IEnumsResolverMap = {
  SurveyStatuses: SurveyStatuses,
  SurveyTypes: SurveyTypes,
  QuestionTypes: QuestionTypes,
}

export default resolvers;
