// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { customerSchema } from './schema';

export const customersCollection = new DefaultDBCollection({
  name: 'customers',
  schema: customerSchema,
  collectionName: 'customers',
});
