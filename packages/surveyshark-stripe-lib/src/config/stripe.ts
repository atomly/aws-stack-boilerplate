// Libraries
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsInt,
  Type,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  Loader,
} from '@atomly/config-loader';
import {
  StripeSupportedCurrencies,
  StripePriceRecurringIntervals,
} from '@atomly/surveyshark-collections-lib';

class Product {
  @IsString({
    message: Loader.errorMessageTemplate(
      'the name is not valid',
      'check that the name is a valid string and try again',
    ),
  })
  name: string;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the description is not valid',
      'check that the description is a valid string and try again',
    ),
  })
  description: string;
}

class Recurring {
  @IsEnum(
    StripePriceRecurringIntervals,
    {
      message: Loader.errorMessageTemplate(
        'the interval is not valid',
        `check that the interval is one of these values and try again: ${Object.values(StripePriceRecurringIntervals).join(', ')}.`,
      ),
    },
  )
  interval: StripePriceRecurringIntervals;


  @IsInt({
    message: Loader.errorMessageTemplate(
      'the intervalCount is not valid',
      'check that the intervalCount is a valid integer and try again',
    ),
  })
  intervalCount: number;
}

class Price {
  @IsString({
    message: Loader.errorMessageTemplate(
      'the nickname is not valid',
      'check that the nickname is a valid string and try again',
    ),
  })
  nickname: string;

  @IsEnum(
    StripeSupportedCurrencies,
    {
      message: Loader.errorMessageTemplate(
        'the currency is not valid',
        `check that the currency is one of these values and try again: ${Object.values(StripeSupportedCurrencies).join(', ')}.`,
      ),
    },
  )
  currency: StripeSupportedCurrencies;

  @IsInt({
    message: Loader.errorMessageTemplate(
      'the unitAmount is not valid',
      'check that the unitAmount is a valid integer and try again',
    ),
  })
  unitAmount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Recurring)
  recurring: Recurring;
}

class Plan {
  @IsString({
    message: Loader.errorMessageTemplate(
      'the name is not valid',
      'check that the name is a valid string and try again',
    ),
  })
  name: string;

  @IsString({
    message: Loader.errorMessageTemplate(
      'the description is not valid',
      'check that the description is a valid string and try again',
    ),
  })
  description: string;

  @IsBoolean({
    message: Loader.errorMessageTemplate(
      'isActive is not valid',
      'check that isActive is a valid string and try again',
    ),
  })
  isActive: boolean;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Product)
  product: Product;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Price)
  price: Price;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  metadata: Record<string, string>;
}

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

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Plan)
  plans: Plan[];
}
