// Libraries
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

// Types
import { IResolvers } from '../../../types';
import { GraphQLDate } from './scalars';

export interface IScalarsResolverMap extends IResolvers {
  Date: typeof GraphQLDate;
  JSON: typeof GraphQLJSON;
  JSONObject: typeof GraphQLJSONObject;
}
