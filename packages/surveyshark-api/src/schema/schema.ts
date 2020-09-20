// Libraries
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const typesArray = fileLoader(`${__dirname}/resolvers/**/*`).filter(file => {
  return file.kind !== 'Document' && Object.keys(file).length !== 0;
});

export const typeDefs: string = mergeTypes(typesArray, { all: true });
