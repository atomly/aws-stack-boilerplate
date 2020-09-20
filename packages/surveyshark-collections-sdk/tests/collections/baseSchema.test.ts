// Libraries
import faker from 'faker';

// Dependencies
import { UUID_V1_REGEXP, UUID_V4_REGEXP, UserDocument } from '../../src';
import { dbContext } from '../contants';
import { generateUserDocument } from '../fixtures';
import { dropDatabase } from '../utils';

//
// FIXTURE
//

const doc = generateUserDocument();

describe('base schema works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
    },
    120000,
  );

  afterAll(
    async () => {
      await dropDatabase(dbContext);
      await dbContext.close();
    },
    120000,
  );

  it('successfully creates a document for collection that extends from the base schema', async () => {
    const user = await new dbContext.collections.Users.model(doc).save();
    expect(user).toBeTruthy();
  });

  let user: UserDocument;

  it('it should correctly execute pre validate hook on document that extends base schema', async () => {
    const users = await dbContext.collections.Users.model.find({}).lean<UserDocument>();
    expect(users).toHaveLength(1);
    user = users[0];
    expect(user.uuid).toBeTruthy();
    expect(String(user.uuid).match(UUID_V1_REGEXP)).toBeFalsy();
    expect(String(user.uuid).match(UUID_V4_REGEXP)).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.createdAt.getTime()).toBe(user.updatedAt.getTime());
  });

  it('it should correctly execute pre update hook on document that extends base schema', async () => {
    const users = await dbContext.collections.Users.model.find({}).lean<UserDocument>();
    const user = users[0];
    await dbContext.collections.Users.model.updateOne(
      { uuid: user.uuid },
      { email: faker.internet.email() }
    );
    const updatedUser = await dbContext
      .collections
      .Users
      .model
      .findOne({ uuid: user.uuid }).lean<UserDocument>();
    expect(updatedUser).toBeTruthy();
    expect(updatedUser!.email).not.toBe(user.email);
    expect(updatedUser!.createdAt.getTime()).toBe(user.createdAt.getTime());
    expect(updatedUser!.updatedAt).not.toBe(user.updatedAt);
    expect(updatedUser!.updatedAt.getTime()).toBeGreaterThan(updatedUser!.createdAt.getTime());
  });

  it('should correctly delete document that extends base schema', async () => {
    const deletedUsers = await dbContext.collections.Users.model.deleteMany({});
    expect(deletedUsers.deletedCount).toBe(1);
  });
});
