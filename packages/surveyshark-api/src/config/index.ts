// Libraries
import path from 'path';

// Dependencies
import { Loader } from './loader';
import { MongoDBConfig } from './db';
import { ExpressConfig } from './express';
import { RedisConfig } from './redis';

function resolveConfigFileLoation(fileLocation: string): { fileLocationUri: string } {
  return { fileLocationUri: path.resolve(__dirname, fileLocation) };
}

export const loader = new Loader(
  new MongoDBConfig(resolveConfigFileLoation(process.env.DB_CONFIG_FILE_LOCATION!)),
  new ExpressConfig(resolveConfigFileLoation(process.env.EXPRESS_CONFIG_FILE_LOCATION!)),
  new RedisConfig(resolveConfigFileLoation(process.env.REDIS_CONFIG_FILE_LOCATION!)),
);

export type Config = typeof loader.config;
