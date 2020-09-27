// Libraries
import { Survey, Question, Answer, Closure } from '@atomly/surveyshark-collections-sdk';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
  IContext,
} from '../../../types';

export interface ISurveysResolverMap extends IResolvers {
  GraphVertexValue: {
    __resolveType(object: Question | Answer | Closure, info: IContext): 'Question' | 'Answer' | 'Closure' | null;
  }
  Query: {
    readSurvey: Resolver<null, GQL.QueryReadSurveyArgs, Promise<Survey | null>>;
    readSurveys: Resolver<null, GQL.QueryReadSurveysArgs, Promise<Survey[] | IThrowError>>;
  },
  Mutation: {
    createSurvey: Resolver<null, GQL.MutationCreateSurveyArgs, Promise<Survey | IThrowError>>;
    updateSurvey: Resolver<null, GQL.MutationUpdateSurveyArgs, Promise<Survey | null | IThrowError>>;
    deleteSurvey: Resolver<null, GQL.MutationDeleteSurveyArgs, Promise<Survey | null | IThrowError>>;
  },
}
