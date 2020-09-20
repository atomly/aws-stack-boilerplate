
// Libraries
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';

// Dependencies
import { objectTypesDefinitions } from './definitions';

const OUTPUT_LOCATION = path.resolve(__dirname, '..', 'schema.graphql');

(async function(): Promise<void> {
  unlinkSync(OUTPUT_LOCATION);
  writeFileSync(OUTPUT_LOCATION, objectTypesDefinitions, { flag : 'w' });
})();
