// Libraries
import { Answer, GraphVertex } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IAnswersResolverMap extends IResolvers {
  Query: {
    readAnswer: Resolver<null, GQL.QueryReadAnswerArgs, Promise<Answer | null>>;
    readAnswers: Resolver<null, GQL.QueryReadAnswersArgs, Promise<Answer[]>>;
  },
  Mutation: {
    createAnswer: Resolver<null, GQL.MutationCreateAnswerArgs, Promise<GraphVertex | IThrowError>>;
    updateAnswer: Resolver<null, GQL.MutationUpdateAnswerArgs, Promise<GraphVertex | null | IThrowError>>;
    deleteAnswer: Resolver<null, GQL.MutationDeleteAnswerArgs, Promise<GraphVertex | null | IThrowError>>;
  },
}
