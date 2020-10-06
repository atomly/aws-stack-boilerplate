// Types
import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';

// Dependencies
import { context } from '../context';

/**
 * Handles errors and parses them into JSON API error objects that
 * provide additional information about problems encountered while
 * performing an operation.
 * 
 * [JSON API error objects docs](https://jsonapi.org/format/#error-objects).
 */
export async function jsonApiErrorHandlerMiddleware(
  err: HttpError | Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('ERROR: ', err);

    await context?.dbContext.close();

    switch (true) {
      // Using http-error package
      case err instanceof HttpError:
        res
          .status((err as HttpError).statusCode)
          .json({
            errors: [{
              status: (err as HttpError).statusCode,
              code: err.name,
              title: err.message,
            }],
          });
        break;
      // Check validation errors thrown by mongoose schemas
      case err.name === 'ValidationError':
        res
          .status(500)
          .json({
            errors: [{
              status: '500',
              code: 'InternalError',
              title: `${err}`,
            }],
          });
        break;
      default:
        res
          .status(500)
          .json({
            errors: [{
              status: '500',
              code: 'InternalError',
              title: err.message,
            }],
          });
    }
  }
  next();
}
