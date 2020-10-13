import { Base, BaseDocument } from '../base';
import { StripePriceRecurringIntervals, StripeSupportedCurrencies } from '../stripe';

export interface Product {
  externalId: string;
  name: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

export interface Price {
  externalId: string;
  name: string;
  description?: string;
  /**
   * Three-letter ISO currency code, in lowercase.
   * Must be a supported currency.
   * - [ISO currency codes](https://www.iso.org/iso-4217-currency-codes.html).
   * - [Supported currencies](https://stripe.com/docs/currencies).
   */
  currency: StripeSupportedCurrencies;
  /**
   * A positive integer in cents (or 0 for a free price)
   * representing how much to charge.
   */
  unitAmount: number;
  /**
   * The recurring components of a price such as `interval`
   * and `usage_type`.
   */
  recurring: {
    /**
     * Specifies billing frequency. Either `day`, `week`, `month`
     * or `year`.
     */
    interval: StripePriceRecurringIntervals;
    /**
     * The number of intervals between subscription billings. For
     * example, interval=`month` and `interval_count`=3 bills every 3
     * months. Maximum of one year interval allowed (1 year, 12
     * months, or 52 weeks).
     */
    intervalCount: number;
  }
  metadata?: Record<string, unknown>;
}

export interface Plan extends Base {
  name: string;
  description: string;
  isActive: boolean;
  product: Product;
  price: Price;
  metadata: Record<string, unknown>;
}

export type PlanDocument = Plan & BaseDocument;
