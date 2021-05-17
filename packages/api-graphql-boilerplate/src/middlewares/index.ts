// Types  
import { IMiddleware } from 'graphql-middleware';

// Dependencies
import { depthLimits } from './depthLimits';

/**
 * TODO: Add authentication resolver middlewares here.
 *
 * Example: 
 *    Mutation: {
 *        createListing: isAuthenticated,
 *        deleteListing: isAuthenticated,
 *    }
 */
export const middlewares: IMiddleware[] = [depthLimits];
