// Libraries
import { Result } from '@atomly/surveyshark-collections-lib';
import { Request, Response } from 'express';

// Dependencies
import { context } from '../../context';

enum SurveyExportResultsFileFormat {
  JSON = 'json',
}

interface SurveyExportResultsPostRequestBody {
  surveyId: string;
  fileFormat: SurveyExportResultsFileFormat;
}

export class SurveyExportResultsController {
  static streamTransformer(fileFormat: SurveyExportResultsFileFormat, doc: Result): string {
    switch (fileFormat) {
      case SurveyExportResultsFileFormat.JSON:
        return JSON.stringify(doc);
    }
  }

  /**
   * Passes a transform function to the query cursor as shown in the Mongoose documentation.
   * The `.cursor()` function triggers pre find hooks, but not post find hooks. The express
   * response is then piped to the query cursor.
   * @param {Function} transform - Optional function which accepts a mongoose document.
   * [Documentation](https://mongoosejs.com/docs/api.html#query_Query-cursor).
   * [Source code](https://github.com/Automattic/mongoose/blob/master/lib/cursor/QueryCursor.js).
   */
  static async post(req: Request, res: Response, next: (t: unknown) => unknown): Promise<void> {
    try {
      const { surveyId, fileFormat } = req.body as SurveyExportResultsPostRequestBody;

      context.dbContext.collections.Results
        .model
        .find({ surveyId })
        .cursor({ transform: (doc: Result) => this.streamTransformer(fileFormat, doc) })
        .pipe(res.type('application/json'))
    } catch (err) {
      next(err);
    }
  }
}
