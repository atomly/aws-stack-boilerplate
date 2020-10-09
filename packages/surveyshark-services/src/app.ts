// Libraries
import express, { Express, RequestHandler, Router } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dependencies
import helmet from 'helmet';
import { jsonApiErrorHandlerMiddleware } from './middlewares';

export function buildExpressApp(
  router: Router,
  ...midlewares: (() => RequestHandler)[]
): Express {
  const app = express();

  //
  // Middlewares
  //

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
      // 'GET',
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

  // Parses json/text and only looks at requests where the Content-Type header matches the type option.
  app.use(bodyParser.json({ strict: false, limit: '10mb' }));
  app.use(bodyParser.text());

  // Protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  midlewares.forEach(middleware => { app.use(middleware()) });

  //
  // Routes
  //

  app.use(router);

  //
  // Error Handling (must go last)
  //

  // Parses errors and sends them following the JSON API error specs:
  app.use(jsonApiErrorHandlerMiddleware);

  return app;
}
