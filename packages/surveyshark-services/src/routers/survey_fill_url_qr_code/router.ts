// Libraries
import { Router } from 'express';

// Dependenies
import { jsonSchemaValidatorMiddleware } from '../../middlewares';
import { SurveyFillUrlQrCodeController } from './controller';

// Schemas
import postSchema from './schemas/post.json';

export function setSurveyFillUrlQrCodeRouter(args: {
  baseUrl: string;
} = {
  baseUrl: 'survey_fill_url_qr_code',
}): Router {
  const router: Router = Router();

  router
    .route(`/${args.baseUrl}`)
    .post(
      jsonSchemaValidatorMiddleware(postSchema),
      SurveyFillUrlQrCodeController.post,
    );

  return router;
}