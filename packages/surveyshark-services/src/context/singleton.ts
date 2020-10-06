// Libraries
import { SurveySharkDBContext } from '@atomly/surveyshark-collections-lib';

// Types
import { dbContext } from '../db';

class ContextSingleton {
  private static instance: ContextSingleton;

  /**
   * If the instance has not been initialized then it will construct a new context object.
   * If it has already been created then it will simply return the instance property.
   * This assures that there will only ever be one instance.
   */
  static getInstance(): ContextSingleton {
    if (!ContextSingleton.instance) {
      ContextSingleton.instance = new ContextSingleton({
        dbContext,
      });
    }
    return ContextSingleton.instance;
  }

  /**
   * Private constructor that can not be modified nor accessed outside of the class.
   */
  private constructor(args: {
    dbContext: SurveySharkDBContext;
  }) {
    this.dbContext = args.dbContext;
  }

  public dbContext: typeof dbContext;

  public async start(): Promise<void> {
    // Opening up a database connection:
    await this.dbContext.open();
  }

  public async stop(): Promise<void> {
    // Closing the database connection:
    await this.dbContext.close();
  }
}

export const context = ContextSingleton.getInstance();
