
// Dependencies
import { buildExpressApp } from '../src/app';
import {
  composeRouters,
  setSurveyExportResultsRouter,
  setSurveyFillUrlQrCodeRouter,
} from '../src/routers';

export const app = buildExpressApp(composeRouters(
  setSurveyExportResultsRouter(),
  setSurveyFillUrlQrCodeRouter(),
));

