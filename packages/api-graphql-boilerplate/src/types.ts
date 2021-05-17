/* eslint-disable @typescript-eslint/no-explicit-any */
// Types
import { Request, Response } from'express';
import { Redis } from 'ioredis';
import { TemplateDBContext } from '@atomly/entities-lib-boilerplate';
import { GraphQLResolveInfo } from 'graphql';
import { IResolvers as Resolvers } from 'graphql-tools';
import { ExecutionParams } from 'subscriptions-transport-ws';
import Stripe from 'stripe';
import { config as templateConfig } from './config';
import { Session, SessionData } from 'express-session';

export interface TemplateRequest extends Request {
  session: Session & Partial<SessionData> & { userId: string };
}

// GraphQLServer.context
export interface IContext {
  config: typeof templateConfig;
  request: TemplateRequest;
  response: Response;
  redis: Redis;
  dbContext: TemplateDBContext;
  subscriptionParams?: ExecutionParams;
  stripe: Stripe;
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
