// Types
import { TemplateDBContext } from '@atomly/entities-lib-boilerplate';

/**
 * Drops all of the database collections. Should be run after each test.
 * @param dbContext 
 */
export async function dropDatabase(dbContext: TemplateDBContext): Promise<void> {
  const isTestDatabase = dbContext.connection.host.match(/localhost|127.0.0.1/)
  if (isTestDatabase) {
    console.log(`WARN: Dropping test database: ${dbContext.connection.host}`);
    const promises = Object
      .values(dbContext.collections)
      .map(collection => collection.model.collection.drop());
    await Promise.all(promises);
    console.log(`WARN: Database dropped successfully`);
  } else {
    throw new Error(`WARNING: Trying to delete non-test database: ${dbContext.connection.host}`)
  }
}
