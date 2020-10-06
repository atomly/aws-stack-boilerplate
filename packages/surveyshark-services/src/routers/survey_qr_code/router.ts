// Libraries
import { Router } from 'express';

// Dependenies
import { jsonSchemaValidatorMiddleware } from '../../middlewares';
import { controller } from './controllers';

// Schemas
import postSchema from './schemas/post.json';

export const baseUrl = 'survey_qr_code';

export function setRouter(): Router {
  const router: Router = Router();

  router
    .route(`/${baseUrl}`)
    .post(
      jsonSchemaValidatorMiddleware(postSchema),
      controller.post,
    );

  return router;
}
