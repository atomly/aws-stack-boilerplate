import { Base, BaseDocument } from '../base';
import { User } from '../users';
import { StripeSupportedCurrencies } from '../stripe';

export interface CustomerPaymentMethodDetails {
  card: {
    lastFourDigits: string;
    expMonth: number;
    expYear: number;
    fingerprint: string;
  };
  address: {
    city?: string;
    country?: string;
    line1?: string;
    line2?: string;
    postalCode?: string;
    state?: string;
  };
  email?: string;
  name?: string;
  phone?: string;
}

export interface CustomerPaymentMethod {
  externalId: string;
  details: CustomerPaymentMethodDetails;
}

export interface Customer extends Base {
  userId: User['uuid'];
  externalId: string;
  currency: StripeSupportedCurrencies;
  externalDefaultPaymentMethodId?: string;
  paymentMethods: CustomerPaymentMethod[];
  /**
   * The prefix for the customer used to generate unique invoice numbers.
   */
  invoicePrefix?: string;
}

export type CustomerDocument = Customer & BaseDocument;
