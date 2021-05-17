// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { planSchema } from './schema';

export const plansCollection = new DefaultDBCollection({
  name: 'plans',
  schema: planSchema,
  collectionName: 'plans',
});
