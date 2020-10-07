// Libraries
import { Router } from 'express';

// Dependenies
import { jsonSchemaValidatorMiddleware } from '../../middlewares';
import { SurveyFillUrlQrCodeController } from './controller';

// Schemas
import postSchema from './schemas/post.json';

export const baseUrl = 'survey_fill_url_qr_code';

export function setSurveyFillUrlQrCodeRouter(): Router {
  const router: Router = Router();

  router
    .route(`/${baseUrl}`)
    .post(
      jsonSchemaValidatorMiddleware(postSchema),
      SurveyFillUrlQrCodeController.post,
    );

  return router;
}
