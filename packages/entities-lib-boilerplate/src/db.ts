/* eslint-disable @typescript-eslint/no-explicit-any */

// Libraries
import { Connection } from 'mongoose';

// Dependencies
import { DefaultDBContext } from '@atomly/mongoose-sdk';
import {
  customersCollection,
  plansCollection,
  subscriptionsCollection,
  usersCollection,
} from './collections';

export const collections = {
  Customers: customersCollection,
  Plans: plansCollection,
  Subscriptions: subscriptionsCollection,
  Users: usersCollection,
};

export class TemplateDBContext<T extends typeof collections = typeof collections> extends DefaultDBContext<T> {
  constructor(args: {
      connectionString: string;
      collections: T;
  }) {
    super(args);
  }

  public async setup(connection: Connection): Promise<void> {
    Object.values(this.collections).forEach((collection) => {
      collection.setupModel(connection);
    });
  }
}
