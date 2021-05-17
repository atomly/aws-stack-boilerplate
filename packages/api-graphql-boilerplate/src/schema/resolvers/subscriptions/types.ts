// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

// Query resolvers
type TQuerySubPing = Resolver<null, GQL.QuerySubPingArgs, Promise<string>>;

// Subscription resolvers
type TSubscriptionSubPong = Resolver<null, null, AsyncIterator<string>>;
type TSubscriptionGreetings = Resolver<null, null, AsyncGenerator<{ greetings: string; }, void, unknown>>;

export interface ISubscriptionResolverMap extends IResolvers {
  Query: {
    subPing: TQuerySubPing;
  }
  Subscription: {
    subPong: {
      subscribe: TSubscriptionSubPong
    };
    greetings: {
      subscribe: TSubscriptionGreetings
    };
  }
}
