// Libraries
import { Answer } from '@atomly/surveyshark-collections-sdk';

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
    createAnswer: Resolver<null, GQL.MutationCreateAnswerArgs, Promise<Answer | IThrowError>>;
    updateAnswer: Resolver<null, GQL.MutationUpdateAnswerArgs, Promise<Answer | null | IThrowError>>;
    deleteAnswer: Resolver<null, GQL.MutationDeleteAnswerArgs, Promise<Answer | null | IThrowError>>;
  },
}
