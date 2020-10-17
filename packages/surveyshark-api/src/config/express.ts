// Libraries
import { IsString, Loader } from '@atomly/config-loader';

export class ExpressLoader extends Loader<'express'> {
  public readonly __name: 'express' = 'express';

  @IsString({
    message: Loader.errorMessageTemplate(
      'the session secret key is not valid',
      'check that the secret session key is a valid string and try again',
    ),
  })
  sessionSecretKey: string;
}
