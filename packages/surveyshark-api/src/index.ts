import 'reflect-metadata';

// NOTE: Set up the ENV configuration before importing anything.
import { setupEnv } from './env';

setupEnv(setupEnv.ENodeEnvConfig.DEVELOPMENT);

// Libraries
import Redis from 'ioredis';
import { SurveySharkDBContext, collections } from '@atomly/surveyshark-collections-lib';
import Hubful, {
  IORedisEventsService,
  IORedisStorageService,
  DefaultPublisherService,
  DefaultSubscriberService,
} from '@atomly/hubful';

// Dependencies
import { config } from './config';
import { startServer } from './server';

(
  /**
   * Loads the API configuration then starts the server.
   */
  async function start(): Promise<void> {
    await config.load();

    // NOTE: Make sure the request credentials setting is set up correctly
    // in the playground: "request.credentials": "include".
    const redis = new Redis({
      port: config.redis.port, // Redis port
      host: config.redis.host, // Redis host
      family: config.redis.family, // 4 (IPv4) or 6 (IPv6)
      password: config.redis.password,
      db: config.redis.db,
    });

    const dbContext = new SurveySharkDBContext({
      connectionString: config.db.dbConnectionString,
      collections,
    });

    const ioRedisEventsService = new IORedisEventsService(config.hubful.redis);

    const ioRedisStorageService = new IORedisStorageService(config.hubful.redis);

    const defaultPublisherService = new DefaultPublisherService({
      eventsService: ioRedisEventsService,
      storageService: ioRedisStorageService,
    });

    const defaultSubscriberService = new DefaultSubscriberService({
      eventsService: ioRedisEventsService,
      storageService: ioRedisStorageService,
    });

    await Hubful.setup({
      eventsService: ioRedisEventsService,
      storageService: ioRedisStorageService,
      publisherService: defaultPublisherService,
      subscriberService: defaultSubscriberService,
    });

    await startServer(redis, dbContext, config.express.sessionSecretKey);
  }
)();
