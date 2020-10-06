// Libraries
import express, { Express, Router } from 'express';
import awsServerlessExpressMiddleware  from 'aws-serverless-express/middleware';
import bodyParser from 'body-parser';
import cors from 'cors';

// Dependencies
import helmet from 'helmet';
import { jsonApiErrorHandlerMiddleware } from './middlewares';

export function buildExpressApp(router: Router): Express {
  const app = express();

  // Express configuration.
  app.use(cors());
  app.disable('x-powered-by');

  //
  // Middlewares
  //

  // Getting the API Gateway event object:
  app.use(awsServerlessExpressMiddleware.eventContext());

  // Parses json/text and only looks at requests where the Content-Type header matches the type option.
  app.use(bodyParser.json({ strict: false, limit: '10mb' }));
  app.use(bodyParser.text());

  // Protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
  app.use(helmet());

  app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  //
  // Routes
  //
  app.use(router);

  // Middleware for error handling.
  app.use(jsonApiErrorHandlerMiddleware);

  return app;
}
