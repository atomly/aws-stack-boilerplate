// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { welcomeScreenSchema } from './schema';

export const welcomeScreensCollection = new DefaultDBCollection({
  name: 'welcome_screens',
  schema: welcomeScreenSchema,
  collectionName: 'welcome_screens',
});
