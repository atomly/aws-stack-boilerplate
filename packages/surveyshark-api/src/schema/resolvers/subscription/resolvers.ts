// Types
import { ISubscriptionResolverMap } from './types';

const resolvers: ISubscriptionResolverMap = {
  Subscription: {
    // ping(_, __, { response }): string {
    //   for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
    //     yield { greetings: hi };
    //   }
    // },
    greetings: {
      subscribe: async function* (): AsyncGenerator<{ greetings: string; }, void, unknown> {
        console.log('sup');
        for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
          yield { greetings: hi };
        }
      },
    },
  },
}

export default resolvers;
