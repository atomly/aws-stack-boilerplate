// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { surveySchema } from './schema';

export const surveysCollection = new DefaultDBCollection({
  name: 'surveys',
  schema: surveySchema,
  collectionName: 'surveys',
});
