import { Base, BaseDocument } from '../base';
import { User } from '../users';
import { StripeSupportedCurrencies } from '../stripe';

export interface Customer extends Base {
  userId: User['uuid'];
  externalId: string;
  currency: StripeSupportedCurrencies;
  /**
   * The prefix for the customer used to generate unique invoice numbers.
   */
  invoicePrefix: string;
}

export type CustomerDocument = Customer & BaseDocument;
