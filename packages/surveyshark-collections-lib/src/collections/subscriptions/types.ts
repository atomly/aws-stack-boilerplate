import { Base, BaseDocument } from '../base';
import { User } from '../users';
import { StripeSubscriptionCollectionMethods, StripeSubscriptionStatuses } from '../stripe';

export interface SubscriptionItems {
  externalId: string;
  externalPriceId: string;
  quantity: number;
}

export interface Subscription extends Base {
  userId: User['uuid'];
  externalId: string;
  externalCustomerId: string;
  currentPeriodEnd: Date;
  items: SubscriptionItems[];
  /**
   * Possible values are `incomplete`, `incomplete_expired`, `trialing`, `active`, `past_due`,
   * `canceled`, or `unpaid`.
   */
  status: StripeSubscriptionStatuses;
  /**
   * Either `charge_automatically`, or `send_invoice`. When charging automatically, Stripe will
   * attempt to pay this subscription at the end of the cycle using the default source attached
   * to the customer. When sending an invoice, Stripe will email your customer an invoice with
   * payment instructions.
   */
  collectionMethod: StripeSubscriptionCollectionMethods;
  /**
   * Invoices are statements of amounts owed by a customer, and are either generated one-off, or
   * generated periodically from a subscription.
   */
  externalLatestInvoiceId?: string;
}

export type SubscriptionDocument = Subscription & BaseDocument;
