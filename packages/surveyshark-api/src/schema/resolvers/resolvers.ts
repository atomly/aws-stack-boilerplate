// Dependencies
import { composeResolvers } from '../../utils';

// Types
import { IQueryResolverMap } from './query';
import { IUsersResolverMap } from './users';

// Resolvers
import queryResolvers from './query';
import userResolvers from './users';

export type IResolverMap = (
  IQueryResolverMap &
  IUsersResolverMap
);

export const resolvers: IResolverMap = composeResolvers<IResolverMap>(
  queryResolvers,
  userResolvers,
);
