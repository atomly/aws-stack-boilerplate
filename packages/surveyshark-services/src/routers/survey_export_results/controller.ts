// Libraries
import { Request, Response } from 'express';
import { Transform, TransformOptions, TransformCallback } from 'stream';

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
  static JsonTransformer = class JsonTransformer<T = unknown> extends Transform {
    constructor(args: TransformOptions = {}) {
      args.objectMode = true; // Consumes one object at a time when this option is true.
      super(args);
      this._transform = function(chunk: T, _encoding: BufferEncoding, callback: TransformCallback): void {
        const json = JSON.stringify(chunk, null, 2) ;
        this.push(json) // Sends data down the pike.
        callback() // Lets the incoming stream know that we're done processing.
      }
    }
  }

  static StreamTransform(fileFormat: SurveyExportResultsFileFormat, args?: TransformOptions): Transform {
    switch (fileFormat) {
      case SurveyExportResultsFileFormat.JSON:
        return new SurveyExportResultsController.JsonTransformer(args);
    }
  }

  /**
   * Passes a transform function to the query cursor as shown in the Mongoose documentation.
   * The `.cursor()` function triggers pre find hooks, but not post find hooks. The express
   * response is then piped to the query cursor.
   * [Documentation](https://mongoosejs.com/docs/api.html#query_Query-cursor).
   * [Source code](https://github.com/Automattic/mongoose/blob/master/lib/cursor/QueryCursor.js).
   */
  static async post(req: Request, res: Response, next: (t: unknown) => unknown): Promise<void> {
    try {
      const { surveyId, fileFormat } = req.body as SurveyExportResultsPostRequestBody;

      context.dbContext.collections.Results
        .model
        .find({ surveyId })
        .cursor()
        .pipe(SurveyExportResultsController.StreamTransform(fileFormat))
        .pipe(res.type('application/json'));
    } catch (err) {
      next(err);
    }
  }
}
