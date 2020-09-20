// Dependencies
import { setupConfig } from './config';
import { startServer } from './server';

/**
 * Setting up the API configuration within the `process.env` object,
 * then starting up the server.
 */
(async function(): Promise<void> {
  setupConfig(setupConfig.ENodeEnvConfig.DEVELOPMENT);
  await startServer();
})();
