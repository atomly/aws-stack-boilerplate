// Libraries
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envFileProperties = [
  'NODE_ENV',
  'DB_CONFIG_FILE_LOCATION',
  'EXPRESS_CONFIG_FILE_LOCATION',
  'REDIS_CONFIG_FILE_LOCATION',
];

enum ENodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

/**
 * Resolves the .env file location.
 * @return {string} - File location.
 */
function resolveEnvFileLocation(nodeEnv?: ENodeEnv): string {
  switch (nodeEnv) {
    case ENodeEnv.DEVELOPMENT:
      return path.resolve(__dirname, '..', '..', '.env.dev');
    case ENodeEnv.TEST:
      return path.resolve(__dirname, '..', '..', '.env.test');
    case ENodeEnv.PRODUCTION:
      return path.resolve(__dirname, '..', '..', '.env.production');
    default:
      return path.resolve(__dirname, '..', '..', '.env');
  }
}

/**
 * Sets up the environmental configuration.
 * @param {ENodeEnv} nodeEnv - Respective environment to draw config settings from.
 */
export function setupEnv(nodeEnv?: ENodeEnv): void {
  const envPath = resolveEnvFileLocation(nodeEnv);
  dotenv.config({ path: envPath });
  // Validating that all of the properties were in the env file:
  // eslint-disable-next-line no-console
  console.log(`DEBUG: Validating contents of the .env file at ${envPath}.`);
  envFileProperties.forEach(key => {
    if (!(key in process.env)) {
      throw new Error(`ERROR: Key ${key} not found in the .env file at ${envPath}.`);
    }
  });
  // eslint-disable-next-line no-console
  console.log(`DEBUG: The contents of the .env file is valid!`);
}

setupEnv.ENodeEnvConfig = ENodeEnv;

/**
 * Resolves the environmental variables.
 * @param {ENodeEnv} nodeEnv - Respective environment to draw config settings from.
 */
export function resolveEnv(nodeEnv?: ENodeEnv): Record<string, string> {
  const envPath = resolveEnvFileLocation(nodeEnv);
  const envContents = fs.readFileSync(envPath);
  const output = dotenv.parse(envContents);
  // Validating that all of the properties were in the env file:
  // eslint-disable-next-line no-console
  console.log(`DEBUG: Validating contents of the .env file at ${envPath}.`);
  envFileProperties.forEach(key => {
    if (!(key in output)) {
      throw new Error(`ERROR: Key ${key} not found in the .env file at ${envPath}.`);
    }
  });
  // eslint-disable-next-line no-console
  console.log(`DEBUG: The contents of the .env file is valid!`);
  return output;
}

resolveEnv.ENodeEnvConfig = ENodeEnv;
