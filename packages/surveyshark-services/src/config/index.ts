// Libraries
import dotenv from 'dotenv';
import path from 'path';

enum ENodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

/**
 * Serves the .env file directory.
 * @return {string} - File directory.
 */
function serveEnvDir(nodeEnv?: ENodeEnv): string {
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
export function setupConfig(nodeEnv?: ENodeEnv): void {
  const envPath = serveEnvDir(nodeEnv);
  dotenv.config({ path: envPath });
  // Validating that all of the properties were in the env file:
  // eslint-disable-next-line no-console
  console.log(`DEBUG: Validating contents of the .env file at ${envPath}`);
  [
    'NODE_ENV',
    'DB_CONNECTION_STRING',
    'REDIS_CONTAINER_PORT',
    'REDIS_PORT',
    'REDIS_HOST',
    'REDIS_FAMILY',
    'REDIS_PASSWORD',
    'REDIS_DB',
    'SESSION_SECRET_KEY',
    // 'GOOGLE_CLIENT_ID',
    // 'GOOGLE_CLIENT_SECRET',
  ].forEach(key => {
    if (!(key in process.env)) {
      throw new Error(`ERROR: Key/Value pair of ${key} not found in the .env file at ${envPath}`);
    }
  });
  // eslint-disable-next-line no-console
  console.log(`DEBUG: The contents of the .env file is valid!`);
}

setupConfig.ENodeEnvConfig = ENodeEnv;
