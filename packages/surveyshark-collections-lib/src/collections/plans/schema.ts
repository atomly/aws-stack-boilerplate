// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { BaseSchema } from '../base';
import { StripePriceRecurringIntervals, StripeSupportedCurrencies } from '../stripe';

// Types
import { PlanDocument } from './types';

const productSchema = new Schema({
  externalId: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: (): Record<string, unknown> => ({}),
  },
});

const priceSchema = new Schema({
  externalId: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
  },
  currency: {
    type: Schema.Types.String,
    enum: Object.values(StripeSupportedCurrencies),
    required: true,
  },
  unitAmount: {
    type: Schema.Types.Number,
    required: true,
  },
  recurring: {
    interval: {
      type: Schema.Types.String,
      enum: Object.values(StripePriceRecurringIntervals),
      required: true,
    },
    intervalCount: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: (): Record<string, unknown> => ({}),
  },
});

export const planSchema = new BaseSchema<PlanDocument>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  isActive: {
    type: Schema.Types.Boolean,
    required: true,
  },
  product: productSchema,
  price: priceSchema,
  metadata: {
    type: Schema.Types.Mixed,
    default: (): Record<string, unknown> => ({}),
  },
});
