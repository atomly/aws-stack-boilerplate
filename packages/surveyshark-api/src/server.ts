// Libraries
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Response, Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import session from 'express-session';
import connectRedisStore from 'connect-redis';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLFormattedError } from 'graphql';

// Types
import { IContext } from './types';

// Dependencies
import { middlewares } from './middlewares';
import { resolvers, objectTypesDefinitions } from './schema';
import { redisSessionPrefix } from './constants';
import { redis } from './redis';
import { dbContext } from './db';
import { safeJsonParse } from './utils';

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

// Express app.
const app = express();

/**
 * Starts the GraphQL server. Returns void.
 */
export async function startServer(): Promise<void> {
  try {
    // Setting up a database connection:
    await dbContext.open();

    // Setting up CORS:
    app.use(cors({
      // Configures the Access-Control-Allow-Origin CORS header.
      origin: [
        // RegExp that matches the URIs found in this post:
        // https://stackoverflow.com/questions/8426171/what-regex-will-match-all-loopback-addresses
        /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\\:)*?:?0*1$/,
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
        secret: process.env.SESSION_SECRET_KEY as string,
        resave: true,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        },
      }),
    );

    // middleware that only parses json and only looks at requests where the
    // Content-Type header matches the type option.
    app.use(bodyParser.json());

    // Setting up GraphQL HTTP server:
    app.use(
      GRAPHQL_ENDPOINT,
      graphqlHTTP((request, response) => {
        const context: IContext = {
          request: request as Request,
          response: response as Response,
          redis,
          dbContext,
        };
        return {
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
          context,
        };
      }),
      // middlewares,
    );

    app.get( // TODO: Disable in production.
      PLAYGROUND_ENDPOINT,
      expressPlayground({ endpoint: GRAPHQL_ENDPOINT }),
    );

    app.listen(
      EXPRESS_APP_PORT,
      () => {
        // eslint-disable-next-line no-console
        console.log(`DEBUG: App listening on port 4000!`);
      },
    );
  } catch (error) {
    await dbContext.close();
  }
}
