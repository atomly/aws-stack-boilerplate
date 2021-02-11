// Libraries
import { Closure, GraphVertex } from '@atomly/surveyshark-collections-lib';

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
    createClosure: Resolver<null, GQL.MutationCreateClosureArgs, Promise<GraphVertex | IThrowError>>;
    updateClosure: Resolver<null, GQL.MutationUpdateClosureArgs, Promise<GraphVertex | null | IThrowError>>;
    deleteClosure: Resolver<null, GQL.MutationDeleteClosureArgs, Promise<GraphVertex | null | IThrowError>>;
  },
}
