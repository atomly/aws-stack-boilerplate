import { DepthLimitMiddleware } from './helpers';

const depthLimitMiddleware = new DepthLimitMiddleware({
  maxDepth: 5,
  hashConfig: {
    asString: true,
    maxStrLength: 100,
  },
});

export const depthLimits = {
  Query: depthLimitMiddleware.depthLimit,
  Mutation: depthLimitMiddleware.depthLimit,
  Subscription: depthLimitMiddleware.depthLimit,
}
