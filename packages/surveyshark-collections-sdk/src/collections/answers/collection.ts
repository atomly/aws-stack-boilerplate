// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { answerSchema } from './schema';

export const answersCollection = new DefaultDBCollection({
  name: 'answers',
  schema: answerSchema,
  collectionName: 'answers',
});
