// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { closureSchema } from './schema';

export const closuresCollection = new DefaultDBCollection({
  name: 'closures',
  schema: closureSchema,
  collectionName: 'closures',
});
