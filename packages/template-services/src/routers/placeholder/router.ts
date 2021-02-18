// Libraries
import { Router } from 'express';

// Dependenies
import { jsonSchemaValidatorMiddleware } from '../../middlewares';
import { PlaceholderController } from './controller';

// Schemas
import postSchema from './schemas/post.json';

export function setPlaceholderRouter(args: {
  baseUrl: string;
} = {
  baseUrl: 'placeholder',
}): Router {
  const router: Router = Router();

  router
    .route(`/${args.baseUrl}`)
    .post(
      jsonSchemaValidatorMiddleware(postSchema),
      PlaceholderController.post,
    );

  return router;
}
