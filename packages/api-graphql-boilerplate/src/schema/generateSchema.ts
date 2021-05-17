
// Libraries
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';

// Dependencies
import { objectTypesDefinitions } from './definitions';

const GRAPHQL_SCHEMA_OUTPUT_LOCATION = path.resolve(__dirname, '..', 'schema.graphql');

(async function(): Promise<void> {
  unlinkSync(GRAPHQL_SCHEMA_OUTPUT_LOCATION);
  writeFileSync(GRAPHQL_SCHEMA_OUTPUT_LOCATION, objectTypesDefinitions, { flag : 'w' });
})();
