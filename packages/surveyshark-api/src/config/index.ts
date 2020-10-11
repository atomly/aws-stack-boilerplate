// Libraries
import path from 'path';

// Dependencies
import { Loader } from './loader';
import { MongoDBConfig } from './db';
import { ExpressConfig } from './express';
import { RedisConfig } from './redis';
import { StripeConfig } from './stripe';

function resolveConfigFileLoation(fileLocation: string): { fileLocationUri: string } {
  return { fileLocationUri: `file://${path.resolve(__dirname, '..', '..', fileLocation).replace(/\\/g, '/')}` };
}

export const loader = new Loader(
  new MongoDBConfig(resolveConfigFileLoation(process.env.DB_CONFIG_FILE_LOCATION!)),
  new ExpressConfig(resolveConfigFileLoation(process.env.EXPRESS_CONFIG_FILE_LOCATION!)),
  new RedisConfig(resolveConfigFileLoation(process.env.REDIS_CONFIG_FILE_LOCATION!)),
  new StripeConfig(resolveConfigFileLoation(process.env.STRIPE_CONFIG_FILE_LOCATION!)),
);

export type Config = typeof loader.config;
