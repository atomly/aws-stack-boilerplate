// Libraries
import { DefaultDBCollection } from '@atomly/mongoose-sdk';

// Dependencies
import { questionSchema } from './schema';

export const questionsCollection = new DefaultDBCollection({
  name: 'questions',
  schema: questionSchema,
  collectionName: 'questions',
});
