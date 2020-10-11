// NOTE: Set up the ENV configuration before importing anything.
import { setupEnv } from './env';

setupEnv();

// Libraries
import Redis from 'ioredis';
import { SurveySharkDBContext, collections } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { loader } from './config';
import { startServer } from './server';

(
  /**
   * Loads the API configuration then starts the server.
   */
  async function start(): Promise<void> {
    await loader.load();

    // NOTE: Make sure the request credentials setting is set up correctly
    // in the playground: "request.credentials": "include".
    const redis = new Redis({
      port: loader.config.redis.port, // Redis port
      host: loader.config.redis.host, // Redis host
      family: loader.config.redis.family, // 4 (IPv4) or 6 (IPv6)
      password: loader.config.redis.password,
      db: loader.config.redis.db,
    });

    const dbContext = new SurveySharkDBContext({
      connectionString: loader.config.db.dbConnectionString,
      collections,
    });

    await startServer(redis, dbContext);
  }
)();
