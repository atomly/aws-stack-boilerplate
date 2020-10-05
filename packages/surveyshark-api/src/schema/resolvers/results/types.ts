// Libraries
import { Result } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IResultsResolverMap extends IResolvers {
  Query: {
    readResult: Resolver<null, GQL.QueryReadResultArgs, Promise<Result | null>>;
    readResults: Resolver<null, GQL.QueryReadResultsArgs, Promise<Result[]>>;
  },
  Mutation: {
    createResult: Resolver<null, GQL.MutationCreateResultArgs, Promise<Result | IThrowError>>;
    updateResult: Resolver<null, GQL.MutationUpdateResultArgs, Promise<Result | null | IThrowError>>;
    deleteResult: Resolver<null, GQL.MutationDeleteResultArgs, Promise<Result | null | IThrowError>>;
  },
}
