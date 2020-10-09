// Types
import { HttpError } from 'http-errors';
import { Request, Response, NextFunction } from 'express';

const HttpErrorCodes = {
  400: 'BadRequest',
  401: 'Unauthorized',
  402: 'PaymentRequired',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  406: 'NotAcceptable',
  407: 'ProxyAuthenticationRequired',
  408: 'RequestTimeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'LengthRequired',
  412: 'PreconditionFailed',
  413: 'PayloadTooLarge',
  414: 'URITooLong',
  415: 'UnsupportedMediaType',
  416: 'RangeNotSatisfiable',
  417: 'ExpectationFailed',
  418: 'ImATeapot',
  421: 'MisdirectedRequest',
  422: 'UnprocessableEntity',
  423: 'Locked',
  424: 'FailedDependency',
  425: 'UnorderedCollection',
  426: 'UpgradeRequired',
  428: 'PreconditionRequired',
  429: 'TooManyRequests',
  431: 'RequestHeaderFieldsTooLarge',
  451: 'UnavailableForLegalReasons',
  500: 'InternalServerError',
  501: 'NotImplemented',
  502: 'BadGateway',
  503: 'ServiceUnavailable',
  504: 'GatewayTimeout',
  505: 'HTTPVersionNotSupported',
  506: 'VariantAlsoNegotiates',
  507: 'InsufficientStorage',
  508: 'LoopDetected',
  509: 'BandwidthLimitExceeded',
  510: 'NotExtended',
  511: 'NetworkAuthenticationRequired',
}

interface CustomHttpError extends HttpError {
  errorList: string[];
}

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

    switch (true) {
      // Using http-error package
      case err instanceof HttpError: {
        res
          .status((err as HttpError).statusCode)
          .json({
            errors: Array.isArray((err as CustomHttpError).errorList) ?
              (err as CustomHttpError).errorList.map(e => ({
                status: (err as HttpError).statusCode,
                code: HttpErrorCodes[(err as HttpError).statusCode as keyof typeof HttpErrorCodes],
                title: err.message,
                details: e,
              })) :
              {
                status: (err as HttpError).statusCode,
                code: HttpErrorCodes[(err as HttpError).statusCode as keyof typeof HttpErrorCodes],
                title: err.message,
              },
          });
        break;
      }
      default:
        res
          .status(500)
          .json({
            errors: [{
              status: 500,
              code: HttpErrorCodes[500],
              title: err.message,
            }],
          });
    }
  }
  next();
}
