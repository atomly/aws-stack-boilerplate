// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { BaseSchema } from '../base';
import { UUID_V4_REGEXP } from '../../regexps';
import { StripeSupportedCurrencies } from '../stripe';

// Types
import { CustomerDocument } from './types';

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
  invoicePrefix: {
    type: Schema.Types.String,
    required: true,
  },
});
