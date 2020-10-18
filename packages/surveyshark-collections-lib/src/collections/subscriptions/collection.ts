// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { subscriptionSchema } from './schema';

export const subscriptionsCollection = new DefaultDBCollection({
  name: 'subscriptions',
  schema: subscriptionSchema,
  collectionName: 'subscriptions',
});
