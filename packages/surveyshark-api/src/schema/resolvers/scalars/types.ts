// Types
import { IResolvers } from '../../../types';
import { GraphQLDate, GraphQLJSON, GraphQLJSONObject } from './scalars';

export interface IScalarsResolverMap extends IResolvers {
  Date: typeof GraphQLDate;
  JSON: typeof GraphQLJSON;
  JSONObject: typeof GraphQLJSONObject;
}
