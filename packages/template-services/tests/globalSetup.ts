// Libraries
import dotenv from 'dotenv';
import path from 'path';

const ENV_TEST_FILE_LOCATION = path.resolve(__dirname, '..', '.env.test');

export default async (): Promise<void> => {
  const output = dotenv.config({ path: ENV_TEST_FILE_LOCATION });
  if (output.error) { throw new Error(`Invalid .env.test file location: ${ENV_TEST_FILE_LOCATION}`); }
  console.log('\nStarting tests...\n');
};
