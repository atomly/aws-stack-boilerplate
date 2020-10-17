// Libraries
import Hubful, { HubfulAsyncIterator } from '@atomly/hubful';

// Types
import { ISubscriptionResolverMap } from './types';

const HUBFUL_SUBPONG = 'HUBFUL_SUBPONG';

const resolvers: ISubscriptionResolverMap = {
  Query: {
    async subPing(_, { input }): Promise<string> {
      await Hubful.publish(HUBFUL_SUBPONG, { subPong: input.message });
      return input.message;
    },
  },
  Subscription: {
    subPong: {
      subscribe(): AsyncIterator<string> {
        return new HubfulAsyncIterator({ hubful: Hubful, topics: HUBFUL_SUBPONG });
      },
    },
    greetings: {
      subscribe: async function* (): AsyncGenerator<{ greetings: string; }, void, unknown> {
        for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
          yield { greetings: hi };
        }
      },
    },
  },
}

export default resolvers;
