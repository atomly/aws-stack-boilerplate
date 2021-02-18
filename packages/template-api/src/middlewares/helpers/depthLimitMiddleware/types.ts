/* eslint-disable @typescript-eslint/no-explicit-any */
// Types  
import {
  GraphQLResolveInfo,
  GraphQLFieldResolver,
} from 'graphql';
import { IContext } from '../../../types';

// Utils
import { throwError } from '../../../utils';

export interface IDepthLimitConfig {
  maxDepth: number
  hashConfig: {
    asString: boolean
    maxStrLength: number
    seed?: number
  }
}

export interface IDepthLimitMiddleware {
  config: IDepthLimitConfig
  depthCache: Map<string, number>
  depthLimit: (
    resolve: GraphQLFieldResolver<any, IContext>,
    parent: any,
    args: any,
    context: IContext,
    info: GraphQLResolveInfo,
  ) => ReturnType<GraphQLFieldResolver<any, IContext>> | ReturnType<typeof throwError>
}
