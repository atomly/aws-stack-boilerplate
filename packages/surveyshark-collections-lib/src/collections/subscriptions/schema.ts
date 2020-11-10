// Libraries
import { Schema } from 'mongoose';

// Dependencies
import { BaseSchema } from '../base';
import { UUID_V4_REGEXP } from '../../regexps';
import { StripeSubscriptionCollectionMethods, StripeSubscriptionStatuses } from '../stripe';

// Types
import { SubscriptionDocument } from './types';

const subscriptionItems = new Schema(
  {
    externalId: {
      type: Schema.Types.String,
      required: true,
    },
    externalPriceId: {
      type: Schema.Types.String,
      required: true,
    },
    quantity: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  { minimize: false },
);

export const subscriptionSchema = new BaseSchema<SubscriptionDocument>(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
    },
    planId: {
      type: Schema.Types.String,
      required: true,
      match: [UUID_V4_REGEXP, 'Invalid UUID v4 pattern.'],
    },
    externalId: {
      type: Schema.Types.String,
      required: true,
    },
    externalCustomerId: {
      type: Schema.Types.String,
      required: true,
    },
    currentPeriodStart: {
      type: Schema.Types.Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Schema.Types.Date,
      required: true,
    },
    items: [subscriptionItems],
    status: {
      type: Schema.Types.String,
      enum: Object.values(StripeSubscriptionStatuses),
      required: true,
    },
    collectionMethod: {
      type: Schema.Types.String,
      enum: Object.values(StripeSubscriptionCollectionMethods),
      required: true,
    },
    externalLatestInvoiceId: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { minimize: false },
);
