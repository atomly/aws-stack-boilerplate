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
} from '@atomly/template-collections-lib';

class Product {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

class Recurring {
  @IsEnum(StripePriceRecurringIntervals)
  interval: StripePriceRecurringIntervals;


  @IsInt()
  intervalCount: number;
}

class Price {
  @IsString()
  nickname: string;

  @IsEnum(StripeSupportedCurrencies)
  currency: StripeSupportedCurrencies;

  @IsInt()
  unitAmount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Recurring)
  recurring: Recurring;
}

class Plan {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
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

  @IsString()
  publicKey: string;

  @IsString()
  secretKey: string;

  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Plan)
  plans: Plan[];
}
