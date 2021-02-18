// Libraries
import 'reflect-metadata';
import path from 'path';
import { Config } from '@atomly/config-loader';

// API Configurations
import { resolveEnv } from '../src/env';
import { config } from '../src/config';
import { MongoDBLoader } from '../src/config/db';
import { HubfulLoader } from '../src/config/hubful';
import { ExpressLoader } from '../src/config/express';
import { RedisLoader } from '../src/config/redis';
import { StripeLoader } from '../src/config/stripe';

function resolveConfigFileLoation(fileLocation: string): { fileLocationUri: string } {
  return { fileLocationUri: `file://${path.resolve(__dirname, '..', fileLocation).replace(/\\/g, '/')}` };
}

describe('app config works correctly', () => {
  test('configuration API works correctly', async () => {
    await config.load();
    expect(config.db).toBeTruthy();
    expect(config.express).toBeTruthy();
    expect(config.redis).toBeTruthy();
    expect(config.stripe).toBeTruthy();
  });
});

describe('config using .env.test works correctly', () => {
  const env = resolveEnv(resolveEnv.ENodeEnvConfig.TEST);

  const config = new Config(
    new MongoDBLoader(resolveConfigFileLoation(env.DB_CONFIG_FILE_LOCATION!)),
    new ExpressLoader(resolveConfigFileLoation(env.EXPRESS_CONFIG_FILE_LOCATION!)),
    new RedisLoader(resolveConfigFileLoation(env.REDIS_CONFIG_FILE_LOCATION!)),
    new HubfulLoader(resolveConfigFileLoation(env.HUBFUL_CONFIG_FILE_LOCATION!)),
    new StripeLoader(resolveConfigFileLoation(env.STRIPE_CONFIG_FILE_LOCATION!)),
  );

  test('configuration API works correctly', async () => {
    await config.load();
    expect(config.db).toBeTruthy();
    expect(config.express).toBeTruthy();
    expect(config.redis).toBeTruthy();
    expect(config.stripe).toBeTruthy();
  });
});

describe('config using .env.dev works correctly', () => {
  const env = resolveEnv(resolveEnv.ENodeEnvConfig.DEVELOPMENT);

  const config = new Config(
    new MongoDBLoader(resolveConfigFileLoation(env.DB_CONFIG_FILE_LOCATION!)),
    new ExpressLoader(resolveConfigFileLoation(env.EXPRESS_CONFIG_FILE_LOCATION!)),
    new HubfulLoader(resolveConfigFileLoation(env.HUBFUL_CONFIG_FILE_LOCATION!)),
    new RedisLoader(resolveConfigFileLoation(env.REDIS_CONFIG_FILE_LOCATION!)),
    new StripeLoader(resolveConfigFileLoation(env.STRIPE_CONFIG_FILE_LOCATION!)),
  );

  test('configuration API works correctly', async () => {
    await config.load();
    expect(config.db).toBeTruthy();
    expect(config.express).toBeTruthy();
    expect(config.redis).toBeTruthy();
    expect(config.stripe).toBeTruthy();
  });
});

// TODO: config using .env.prod works correctly
