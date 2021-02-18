// Types
import { Resolver, IResolvers } from '../../../types';

// Query resolvers
type TQueryPing = Resolver<null, null, string>;

export interface IQueryResolverMap extends IResolvers {
  Query: {
    ping: TQueryPing;
  }
}
