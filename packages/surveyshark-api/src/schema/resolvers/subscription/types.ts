// Types
import { Resolver, IResolvers } from '../../../types';

// Query resolvers
type TSubscriptionGreetings = Resolver<null, null, AsyncGenerator<{ greetings: string; }, void, unknown>>;

export interface ISubscriptionResolverMap extends IResolvers {
  Subscription: {
    greetings: {
      subscribe: TSubscriptionGreetings
    };
  }
}
