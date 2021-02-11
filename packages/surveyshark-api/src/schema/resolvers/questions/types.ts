// Libraries
import { Question, GraphVertex } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IQuestionsResolverMap extends IResolvers {
  Query: {
    readQuestion: Resolver<null, GQL.QueryReadQuestionArgs, Promise<Question | null>>;
    readQuestions: Resolver<null, GQL.QueryReadQuestionsArgs, Promise<Question[]>>;
  },
  Mutation: {
    createQuestion: Resolver<null, GQL.MutationCreateQuestionArgs, Promise<GraphVertex | IThrowError>>;
    updateQuestion: Resolver<null, GQL.MutationUpdateQuestionArgs, Promise<GraphVertex | null | IThrowError>>;
    deleteQuestion: Resolver<null, GQL.MutationDeleteQuestionArgs, Promise<GraphVertex | null | IThrowError>>;
  },
}
