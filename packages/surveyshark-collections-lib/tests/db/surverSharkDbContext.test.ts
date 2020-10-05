// Dependencies
import {
  SurveySharkDBContext,
  collections,
} from '../../src';
import { DB_CONNECTION_STRING } from '../contants';

const dbContext = new SurveySharkDBContext({
  connectionString: DB_CONNECTION_STRING,
  collections,
});

describe('DefaultDBContext works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
    },
    120000,
  );

  afterAll(
    async () => {
      await dbContext.close();
    },
    120000,
  );

  it('successfully opens the dbContext', async () => {
    expect(dbContext.connection.readyState).toBe(1);
  });

  test('connection has the correct model names', () => {
    expect(dbContext.connection.modelNames()).toMatchObject(Object
      .values(collections)
      .map(collection => collection.name),
    );
  });

  test('connection has the correct collection names', () => {
    expect(Object.keys(dbContext.connection.collections)).toMatchObject(Object
      .values(collections)
      .map(collection => collection.collectionName),
    );
  });
});
