// Dependencies
import { composeResolvers } from '../../utils';

// Resolvers
import enumsResolvers, { IEnumsResolverMap } from './enums';
import paymentsResolvers, { IPaymentsResolverMap } from './payments';
import queryResolvers, { IQueryResolverMap } from './queries';
import scalarsResolvers, { IScalarsResolverMap } from './scalars';
import subscriptionResolvers, { ISubscriptionResolverMap } from './subscriptions';
import usersResolvers, { IUsersResolverMap } from './users';

export type IResolverMap = (
  IEnumsResolverMap &
  IPaymentsResolverMap &
  IQueryResolverMap &
  IScalarsResolverMap &
  ISubscriptionResolverMap &
  IUsersResolverMap
);

export const resolvers: IResolverMap = composeResolvers<IResolverMap>(
  enumsResolvers,
  paymentsResolvers,
  queryResolvers,
  scalarsResolvers,
  subscriptionResolvers,
  usersResolvers,
);
