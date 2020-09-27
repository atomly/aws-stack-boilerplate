// Libraries
import { Closure } from '@atomly/surveyshark-collections-sdk';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IClosuresResolverMap extends IResolvers {
  Query: {
    readClosure: Resolver<null, GQL.QueryReadClosureArgs, Promise<Closure | null>>;
    readClosures: Resolver<null, GQL.QueryReadClosuresArgs, Promise<Closure[]>>;
  },
  Mutation: {
    createClosure: Resolver<null, GQL.MutationCreateClosureArgs, Promise<Closure | IThrowError>>;
    updateClosure: Resolver<null, GQL.MutationUpdateClosureArgs, Promise<Closure | null | IThrowError>>;
    deleteClosure: Resolver<null, GQL.MutationDeleteClosureArgs, Promise<Closure | null | IThrowError>>;
  },
}
