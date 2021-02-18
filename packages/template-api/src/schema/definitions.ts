// Libraries
import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

const RESOLVERS_SCHEMAS_PATH = path.resolve(__dirname, 'resolvers', '**', 'schema.ts');

export const objectTypesArray = fileLoader(RESOLVERS_SCHEMAS_PATH).filter(file => Object.keys(file).length !== 0);

export const objectTypesDefinitions: string = mergeTypes(objectTypesArray, { all: true });
