// Libraries
import { Request, Response } from 'express';
import QRCode from 'qrcode';

// Dependencies
import { context } from '../../context';

interface SurveyFillUrlQrCodePostRequestBody {
  surveyId: string;
  baseUrl: string;
}

export class SurveyFillUrlQrCodeController {
  static async generateDataUrl(surveyId: string, baseUrl: string): Promise<string> {
    const url = baseUrl[String.prototype.lastIndexOf(baseUrl)] === '/' ?
      `${baseUrl}survey/${surveyId}/fill` :
      `${baseUrl}/survey/${surveyId}/fill`;
    const dataUrl = await QRCode.toDataURL(url);
    return dataUrl;
  }
  

  static async post(req: Request, res: Response, next: (t: unknown) => unknown): Promise<void> {
    try {
      const { surveyId, baseUrl } = req.body as SurveyFillUrlQrCodePostRequestBody;

      const qrCodeDataUrl = await SurveyFillUrlQrCodeController.generateDataUrl(surveyId, baseUrl);

      const survey = await context.dbContext.collections.Surveys.model.findOneAndUpdate(
        { uuid: surveyId },
        { fillUrlQrCode: qrCodeDataUrl },
      );

      res.status(200).json(survey);
    } catch (err) {
      next(err);
    }
  }
}
