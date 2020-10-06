// Libraries
import AJV from 'ajv';
import { NextFunction, Request, Response } from 'express';
import HttpError from 'http-errors';

/**
 * Returns an express middleware which uses AJV to validate the request's body
 * against a JSON schema. Throws errors if the validation is not successful.
  * @param schema - JSON schema object, schema ID previously passed to `addSchema`, or any previously resolved reference.
  * @param ajvOptions - AJV constructor options.
  */
export function jsonSchemaValidatorMiddleware(
  schema: string | boolean | Record<string, unknown>,
  ajvOptions: AJV.Options = { jsonPointers: true, allErrors: true },
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const ajv: AJV.Ajv = new AJV(ajvOptions);

      // Validate the request body against the schema:
      const isValid = ajv.validate(schema, req.body) as boolean;

      if (!isValid) {
        const validationErrorMessages: string[] = [];

        // If there are any errors, parse them and throw them:
        if (Array.isArray(ajv.errors)) {
          ajv.errors.forEach(e => {
            validationErrorMessages.push(`${e.dataPath} - ${e.message}`);
          });
        }

        throw HttpError(
          HttpError.BadRequest,
          validationErrorMessages.join(', '),
          { errorList: validationErrorMessages },
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
