// Libraries
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

export const objectTypesArray = fileLoader(`${__dirname}/resolvers/**/*`).filter(file => {
  return file.kind !== 'Document' && Object.keys(file).length !== 0;
});

export const objectTypesDefinitions: string = mergeTypes(objectTypesArray, { all: true });
