
// Libraries
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import awsServerlessExpress, { Response }  from 'aws-serverless-express';

// Dependencies
import { context as c } from '../context';
import { buildExpressApp } from '../app';
import {
  composeRouters,
  setSurveyExportResultsRouter,
  setSurveyFillUrlQrCodeRouter,
} from '../routers';

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<Response> {
  // // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  // context.callbackWaitsForEmptyEventLoop = false;

  await c.dbContext.open();

  const app = buildExpressApp(composeRouters(
    setSurveyExportResultsRouter(),
    setSurveyFillUrlQrCodeRouter(),
  ));

  const server = awsServerlessExpress.createServer(app);

  const result = awsServerlessExpress.proxy(server, event, context, 'PROMISE');

  const response = await result.promise;

  await c.dbContext.close();

  return response;
}
