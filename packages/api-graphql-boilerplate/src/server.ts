// Libraries
import { TemplateDBContext } from '@atomly/entities-lib-boilerplate';
import connectRedisStore from 'connect-redis';
import cors from 'cors';
import express, { Response, Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import session from 'express-session';
import { execute, subscribe, GraphQLFormattedError } from 'graphql';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import expressPlayground from 'graphql-playground-middleware-express';
import { createServer as createHttpServer } from 'http';
import { Redis } from 'ioredis';
import { SubscriptionServer, ExecutionParams, OperationMessage } from 'subscriptions-transport-ws';
import Stripe from 'stripe';

// Types
import { IContext } from './types';

// Dependencies
import { middlewares } from './middlewares';
import { resolvers, objectTypesDefinitions } from './schema';
import { redisSessionPrefix } from './constants';
import { safeJsonParse } from './utils';
import { config as templateConfig } from './config';

//
// SERVER DEPENDENCIES
//

const EXPRESS_APP_PORT = 4000;
const GRAPHQL_ENDPOINT = '/graphql';
const PLAYGROUND_ENDPOINT = '/playground';

// Redis store for user sessions.
const RedisStore = connectRedisStore(session);

// API GraphQL schema.
const schema = makeExecutableSchema({
  typeDefs: objectTypesDefinitions,
  resolvers: resolvers as IResolvers,
});

// API GraphQL schema with graph depth limit middleware, et al.
const schemaWithMiddleware = applyMiddleware(
  schema,
  ...middlewares,
);

/**
 * Starts the GraphQL server. Returns void.
 */
export async function startServer(
  config: typeof templateConfig,
  redis: Redis,
  dbContext: TemplateDBContext,
  stripe: Stripe,
  ): Promise<void> {
  // Express app.
  const app = express();

  try {
    // Setting up a database connection:
    await dbContext.open();

    // Middleware that only parses json and only looks at requests where the
    // Content-Type header matches the type option.
    app.use(express.json());

    // Setting up CORS:
    app.use(cors({
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: [
        // RegExp that matches local URIs found based in this post:
        // https://stackoverflow.com/questions/8426171/what-regex-will-match-all-loopback-addresses
        /(https?)(:\/\/)(localhost|127(?:\.[0-9]+){0,2}\.[0-9]+|(?:0*\\:)*?:?0*1)/,
      ],
      // Configures the Access-Control-Allow-Methods CORS header.
      // Only accept POST requests for GraphQL, and GET requests for the playground.
      methods: [
        'GET',
        // 'HEAD',
        // 'PUT',
        // 'PATCH',
        'POST',
        // 'DELETE',
      ],
      // Pass the CORS preflight response to the next handler.
      preflightContinue: false,
      // Provides a status code to use for successful OPTIONS requests, since some
      // legacy browsers (IE11, various SmartTVs) choke on 204.
      optionsSuccessStatus: 200,
      // // Configures the Access-Control-Allow-Headers CORS header.
      // allowedHeaders: ['Content-Type', 'Authorization'],
      // // Configures the Access-Control-Max-Age CORS header.
      // maxAge: 1000, // 1000 seconds.
      // Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header.
      credentials: true,
    }));

    // Setting up sessions stored in Redis for user authentication on login:
    app.use(
      // TODO: Set up cookie authentication and reduce max age of cookies later.
      session({
        store: new RedisStore({
          client: redis,
          prefix: redisSessionPrefix,
        }),
        name: 'qid',
        secret: config.express.sessionSecretKey,
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      }),
    );

    // Setting up GraphQL HTTP server:
    app.use(
      GRAPHQL_ENDPOINT,
      graphqlHTTP((req, res) => ({
        // A GraphQLSchema instance from GraphQL.js. A schema must
        // be provided.
        schema: schemaWithMiddleware,
        // If true, presents GraphiQL when the GraphQL endpoint is
        // loaded in a browser. We recommend that you set graphiql
        // to true when your app is in development, because it's
        // quite useful. You may or may not want it in production.
        // Alternatively, instead of true you can pass in an options
        // object:
        graphiql: true, // TODO: Disable in production.
        // Any JSON response will be pretty-printed.
        pretty: true,
        // During development, it's useful to get more information
        // from errors, such as stack traces. Providing a function
        // to customFormatErrorFn//enables this:
        customFormatErrorFn: (error): GraphQLFormattedError => {
          const errorMessage = safeJsonParse(error.message).value ?? error.message;
          return {
            message: errorMessage,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
          } as GraphQLFormattedError;
        },
        // GraphQL context object for the resolvers.
        context: {
          config,
          request: req as Request,
          response: res as Response,
          redis,
          dbContext,
          stripe,
        } as IContext,
      })),
    );

    // TODO: Disable in production.
    app.get(
      PLAYGROUND_ENDPOINT,
      expressPlayground({
        endpoint: GRAPHQL_ENDPOINT,
        subscriptionEndpoint: GRAPHQL_ENDPOINT,
      }),
    );

    const server = createHttpServer(app);

    server.listen(
      EXPRESS_APP_PORT,
      () => {
        SubscriptionServer.create(
          {
            schema,
            execute,
            subscribe,
            // keepAlive: 10000,
            onConnect() {
              // eslint-disable-next-line no-console
              console.log('onConnect');
            },
            onOperation(
              _message: OperationMessage,
              params: ExecutionParams,
              // webSocket: WebSocket,
            ) {
              // The response should be formatted when there are errors to match the
              // GraphQLFormattedError schema.
              // See https://github.com/apollographql/subscriptions-transport-ws/issues/182
              params.formatResponse = function(response: Record<string, unknown>): Record<string, unknown> {
                if (Array.isArray(response.errors)) {
                  response.errors = response.errors.map((error): GraphQLFormattedError => {
                    const errorMessage = safeJsonParse(error.message).value ?? error.message;
                    return {
                      message: errorMessage,
                      locations: error.locations,
                      stack: error.stack ? error.stack.split('\n') : [],
                      path: error.path,
                    } as GraphQLFormattedError;
                  });
                }
                return response;
              };

              params.context = {
                config,
                request: {} as Request,
                response: {} as Response,
                redis,
                dbContext,
                subscriptionParams: params,
                stripe,
              } as IContext;

              return params;
            },
            onDisconnect() {
              // eslint-disable-next-line no-console
              console.log('onDisconnect');
            },
          },
          {
            server,
            path: GRAPHQL_ENDPOINT,
          },
        );

        // eslint-disable-next-line no-console
        console.log(`DEBUG: App listening on port ${EXPRESS_APP_PORT}!`);
      },
    );
  } catch (error) {
    await dbContext.close();
  }
}
