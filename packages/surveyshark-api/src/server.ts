// Libraries
import bodyParser from 'body-parser';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import session from 'express-session';
import connectRedisStore from 'connect-redis';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware';
// import { Database } from '@atomly/atomly-entities';

// Types
import { IContext } from './types';

// Dependencies
import { middlewares } from './middlewares';
import { resolvers, objectTypesDefinitions } from './schema';
import { redisSessionPrefix } from './constants';
import { redis } from './redis';

//
// SERVER DEPENDENCIES
//

// TODO: MongoDB
// MongoDB context & connection handler.
const database = new Database({
  type: process.env.DB_CONNECTION! as 'postgres',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_DATABASE!,
  logging: process.env.NODE_ENV !== 'production',
});

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
    await database.getConnection();

    // Setting up sessions stored in Redis for user authentication on login:
    app.use(
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

    // Setting up GraphQL HTTP server:
    app.use(
      '/graphql',
      bodyParser.json(),
      graphqlHTTP({
        // A GraphQLSchema instance from GraphQL.js. A schema must
        // be provided.
        schema: schemaWithMiddleware,
        // TODO: Disable in production.
        // If true, presents GraphiQL when the GraphQL endpoint is
        // loaded in a browser. We recommend that you set graphiql
        // to true when your app is in development, because it's
        // quite useful. You may or may not want it in production.
        // Alternatively, instead of true you can pass in an options
        // object:
        graphiql: true,
        // During development, it's useful to get more information
        // from errors, such as stack traces. Providing a function
        // to customFormatErrorFn//enables this:
        customFormatErrorFn: (error) => ({
          message: error.message,
          locations: error.locations,
          stack: error.stack ? error.stack.split('\n') : [],
          path: error.path,
        }),
        context(context: IContext): IContext {
          return {
            ...context,
            redis,
            // pubsub,
            // database,
            // loaders, // TODO: Loaders
          }
        },
      }),
      // middlewares,
    );

    // TODO: Disable in production.
    app.get(
      '/playground',
      expressPlayground({ endpoint: '/graphql' }),
    );
  } catch (error) {
    console.error('ERROR: ', error);
  }
}
