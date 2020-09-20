// Libraries
import dotenv from 'dotenv';
import path from 'path';

enum ENodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

/**
 * Serves the .env file directory.
 * @return {string} - File directory.
 */
function serveEnvDir(nodeEnv: ENodeEnv): string {
  switch (nodeEnv) {
    case ENodeEnv.PRODUCTION:
      return path.resolve(__dirname, '..', '..', '..', '..', '.env.production');
    case ENodeEnv.DEVELOPMENT:
      return path.resolve(__dirname, '..', '..', '..', '..', '.env');
    case ENodeEnv.TEST:
      return path.resolve(__dirname, '..', '..', '..', '..', '.env.test');
    default:
      return path.resolve(__dirname, '..', '..', '..', '..', '.env');
  }
}

/**
 * Sets up the environmental configuration.
 * @param {ENodeEnv} nodeEnv - Respective environment to draw config settings from.
 */
export function setupConfig(nodeEnv: ENodeEnv): void {
  dotenv.config({ path: serveEnvDir(nodeEnv) });
}

setupConfig.ENodeEnvConfig = ENodeEnv;
