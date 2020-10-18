// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { BaseSchema } from '../base';
import { EMAIL_REGEXP, UUID_V4_REGEXP } from '../../regexps';
import { StripeSupportedCurrencies } from '../stripe';

// Types
import { CustomerDocument } from './types';

const customerPaymentMethodDetails = new Schema({
  card: {
    lastFourDigits: {
      type: Schema.Types.String,
      required: true,
    },
    expMonth: {
      type: Schema.Types.Number,
      required: true,
    },
    expYear: {
      type: Schema.Types.Number,
      required: true,
    },
    fingerprint: {
      type: Schema.Types.String,
      required: true,
    },
  },
  address: {
    city: {
      type: Schema.Types.String,
    },
    country: {
      type: Schema.Types.String,
    },
    line1: {
      type: Schema.Types.String,
    },
    line2: {
      type: Schema.Types.String,
    },
    postalCode: {
      type: Schema.Types.String,
    },
    state: {
      type: Schema.Types.String,
    },
  },
  email: {
    type: Schema.Types.String,
    match: [EMAIL_REGEXP, 'Invalid email pattern'],
  },
  name: {
    type: Schema.Types.String,
  },
  phone: {
    type: Schema.Types.String,
  },
});

const customerPaymentMethod = new Schema({
  externalId: {
    type: Schema.Types.String,
    required: true,
  },
  details: customerPaymentMethodDetails,
})

export const customerSchema = new BaseSchema<CustomerDocument>({
  userId: {
    type: Schema.Types.String,
    required: true,
    match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
  },
  externalId: {
    type: Schema.Types.String,
    required: true,
  },
  currency: {
    type: Schema.Types.String,
    enum: Object.values(StripeSupportedCurrencies),
    required: true,
  },
  paymentMethods: [customerPaymentMethod],
  externalDefaultPaymentMethodId: {
    type: Schema.Types.String,
  },
  invoicePrefix: {
    type: Schema.Types.String,
  },
});
