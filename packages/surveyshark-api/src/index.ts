// NOTE: Set up the ENV configuration before importing anything.
import { setupConfig } from './config';

setupConfig();

// Dependencies
import { startServer } from './server';

/**
 * Setting up the API configuration within the `process.env` object,
 * then starting up the server.
 */
(async function(): Promise<void> {
  await startServer();
})();
