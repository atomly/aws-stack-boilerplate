// Libraries
import { SurveyStatuses, SurveyTypes, QuestionTypes } from '@atomly/surveyshark-collections-sdk';

// Types
import { IEnumsResolverMap } from './types';

const resolvers: IEnumsResolverMap = {
  SurveyStatuses: {
    UNPUBLISHED: SurveyStatuses.UNPUBLISHED,
    PUBLISHED: SurveyStatuses.PUBLISHED,
    MAINTENANCE: SurveyStatuses.MAINTENANCE,
  },
  SurveyTypes: SurveyTypes,
  QuestionTypes: QuestionTypes,
}

export default resolvers;
