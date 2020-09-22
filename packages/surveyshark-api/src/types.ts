/* eslint-disable @typescript-eslint/no-explicit-any */
// Types
import { GraphQLResolveInfo } from 'graphql';
import { Redis } from 'ioredis';
// import { Database } from '@atomly/atomly-entities';

export * as GQL from './schema';

// GraphQLServer.context
export interface IContext {
  redis: Redis
  // pubsub: PubSub
  // database: Database
}

// Resolvers types
export type Resolver<T, R, X> = (parent: T, args: R, context: IContext, info: GraphQLResolveInfo) => X;

// Resolver Maps
export interface IBasicResolvers {
  [key: string]: Resolver<any, any, any>
}

export interface ISubscriptionResolvers {
  [key: string]: {
    subscribe: Resolver<any, any, any>
  }
}

export interface IResolvers {
  Query?: IBasicResolvers
  Mutation?: IBasicResolvers
  Subscription?: ISubscriptionResolvers
}
