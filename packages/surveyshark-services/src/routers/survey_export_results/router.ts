// Libraries
import { Router } from 'express';

// Dependenies
import { jsonSchemaValidatorMiddleware } from '../../middlewares';
import { SurveyExportResultsController } from './controller';

// Schemas
import postSchema from './schemas/post.json';

export function setSurveyExportResultsRouter(args: {
  baseUrl: string;
} = {
  baseUrl: 'survey_export_results',
}): Router {
  const router: Router = Router();

  router
    .route(`/${args.baseUrl}`)
    .post(
      jsonSchemaValidatorMiddleware(postSchema),
      SurveyExportResultsController.post,
    );

  return router;
}
