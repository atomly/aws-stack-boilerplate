// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { userSchema } from './schema';

export const usersCollection = new DefaultDBCollection({
  name: 'users',
  schema: userSchema,
  collectionName: 'users',
});
