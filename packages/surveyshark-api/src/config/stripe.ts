// Libraries
import { IsString, Loader } from '@atomly/config';

export class StripeLoader extends Loader<'stripe'> {
  public readonly __name: 'stripe' = 'stripe';

  @IsString({
    message: Loader.errorMessageTemplate(
      'the public key is not valid',
      'check that the public key is a valid string and try again',
    ),
  })
  publicKey: string;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the secret key is not valid',
      'check that the secret key is a valid string and try again',
    ),
  })
  secretKey: string;
}
