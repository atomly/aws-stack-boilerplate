// Libraries
import path from 'path';
import { Config } from '@atomly/config-loader';

// Dependencies
import { MongoDBLoader } from './db';
import { ExpressLoader } from './express';
import { HubfulLoader } from './hubful';
import { RedisLoader } from './redis';
import { StripeLoader } from './stripe';

function resolveConfigFileLoation(fileLocation: string): { fileLocationUri: string } {
  return { fileLocationUri: `file://${path.resolve(__dirname, '..', '..', fileLocation).replace(/\\/g, '/')}` };
}

export const config = new Config(
  new MongoDBLoader(resolveConfigFileLoation(process.env.DB_CONFIG_FILE_LOCATION!)),
  new ExpressLoader(resolveConfigFileLoation(process.env.EXPRESS_CONFIG_FILE_LOCATION!)),
  new HubfulLoader(resolveConfigFileLoation(process.env.HUBFUL_CONFIG_FILE_LOCATION!)),
  new RedisLoader(resolveConfigFileLoation(process.env.REDIS_CONFIG_FILE_LOCATION!)),
  new StripeLoader(resolveConfigFileLoation(process.env.STRIPE_CONFIG_FILE_LOCATION!)),
);
