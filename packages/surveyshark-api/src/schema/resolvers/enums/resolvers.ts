// Libraries
import { SurveyStatuses, SurveyTypes, QuestionTypes } from '@atomly/surveyshark-collections-sdk';

// Types
import { IEnumsResolverMap } from './types';

const resolvers: IEnumsResolverMap = {
  SurveyStatuses: SurveyStatuses,
  SurveyTypes: SurveyTypes,
  QuestionTypes: QuestionTypes,
}

export default resolvers;