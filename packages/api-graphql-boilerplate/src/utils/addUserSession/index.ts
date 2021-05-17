// Libraries
import { Redis } from 'ioredis';

// Dependencies
import { userSessionIdPrefix } from '../../constants';

export async function addUserSession(redis: Redis, userId: string, sessionID: string): Promise<number> {
  return redis.lpush(`${userSessionIdPrefix}${userId}`, sessionID);
}
