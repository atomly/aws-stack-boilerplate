// Libraries
import { IsString } from 'class-validator';

// Dependencies
import { Validator } from './validator';

export class StripeConfig extends Validator<'stripe'> {
  public readonly __name: 'stripe' = 'stripe';

  @IsString({
    message: Validator.errorMessageTemplate(
      'the public key is not valid',
      'check that the public key is a valid string and try again',
    ),
  })
  publicKey: string;

  @IsString({
    message: Validator.errorMessageTemplate(
      'the secret key is not valid',
      'check that the secret key is a valid string and try again',
    ),
  })
  secretKey: string;
}
