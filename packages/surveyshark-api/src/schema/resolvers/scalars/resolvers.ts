// Dependencies
import { GraphQLDate, GraphQLJSON, GraphQLJSONObject } from './scalars';

// Types
import { IScalarsResolverMap } from './types';

const resolvers: IScalarsResolverMap = {
  Date: GraphQLDate,
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
}

export default resolvers;
