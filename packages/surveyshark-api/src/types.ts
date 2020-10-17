/* eslint-disable @typescript-eslint/no-explicit-any */
// Types
import { Request, Response } from'express';
import { Redis } from 'ioredis';
import { SurveySharkDBContext } from '@atomly/surveyshark-collections-lib';
import { GraphQLResolveInfo } from 'graphql';
import { IResolvers as Resolvers } from 'graphql-tools';
import { ExecutionParams } from 'subscriptions-transport-ws';

// GraphQLServer.context
export interface IContext {
  request: Request;
  response: Response;
  redis: Redis;
  dbContext: SurveySharkDBContext;
  subscriptionParams?: ExecutionParams;
  // pubsub: PubSub;
}

// Resolvers types
export type Resolver<T, R, X> = (parent: T, args: R, context: IContext, info: GraphQLResolveInfo) => X;

// Resolver Maps
export interface IBasicResolvers {
  [key: string]: Resolver<any, any, any>;
}

export interface ISubscriptionResolvers {
  [key: string]: {
    subscribe: Resolver<any, any, any>;
  }
}

export interface IResolvers extends Partial<Resolvers> {
  Query?: IBasicResolvers;
  Mutation?: IBasicResolvers;
  Subscription?: ISubscriptionResolvers;
  // Subscription?: IBasicResolvers;
}

export * as GQL from './types/schema';
