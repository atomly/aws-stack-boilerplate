// Types
import { IQueryResolverMap } from './types';

const resolvers: IQueryResolverMap = {
  Query: {
    ping(_, __, { response }): string {
      return `pong:qid=${response.req?.headers.cookie ?? 'null'}`;
    },
  },
}

export default resolvers;
