// Libraries
import { StripeSupportedCurrencies, User } from '@atomly/entities-lib-boilerplate';
import bcrypt from 'bcrypt';

// Types
import { IUsersResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { createStripeCustomer } from '../../../stripe';
import {
  addUserSession,
  removeAllUserSessions,
  throwError,
  // validateNewEntities,
} from '../../../utils';
import { createStripeSubscription, saveStripeData } from '../../../stripe';

const resolvers: IUsersResolverMap = {
  Query: {
    async user(_, { input }, { dbContext }): Promise<User | null> {
      const user = await dbContext.collections.Users.model.findOne({
        uuid: input.uuid,
      }).lean<User>();

      return user;  
    },
    // async users(_, __, { database }): Promise<User[]> {
    //   const users = await database.connection.getRepository(User).find({
    //     relations: ['member'],
    //   });

    //   return users;
    // },
    async me(_, _args, { request, dbContext }): Promise<User | null> {
      const user = await dbContext.collections.Users.model.findOne({
        uuid: request.session.userId,
      });

      return user;
    },
    async defaultAuthentication(_, args, { request, redis, dbContext }): Promise<User | IThrowError> {
      // Check if there is no user logged in.
      if (!request.session.userId) {
        const user = await dbContext.collections.Users.model.findOne({
          email: args.input.email.toLowerCase(),
        });

        // If there is no user found, return error response.
        if (!user) {
          return throwError({
            status: throwError.Errors.EStatuses.AUTHENTICATION,
            message: `User with email: [${args.input.email.toLowerCase()}] not found.`,
            shouldDisplayMessageInProduction: false,
          });
        }

        // Try to decrypt password.
        const isValid = await bcrypt.compare(args.input.password, user.password!);

        // If the password is not valid, return error response.
        if (!isValid) {
          return throwError({
            status: throwError.Errors.EStatuses.AUTHENTICATION,
            message: 'Passwords do not match.',
            shouldDisplayMessageInProduction: false,
          });
        }

        // Save user's ID to the session and Redis.
        request.session.userId = user.uuid;

        if (request.session.userId) {
          await addUserSession(redis, user.uuid, request.session.userId);
        }

        return user;
      }

      // If there's an authenticated user in this session, return error response.
      return throwError({
        status: throwError.Errors.EStatuses.AUTHENTICATION,
        message: 'User already logged in.',
      });
    },
    async deauthentication(_, _args, { redis, response, request }): Promise<boolean | IThrowError> {
      // Check if there is a user saved in the session.
      if (request.session.userId) {
        await removeAllUserSessions(request.session.userId, redis);

        request.session.destroy((err: Error) => {
          // If error, return throw error response.
          if (err) {
            throwError({
              status: throwError.Errors.EStatuses.INTERNAL_SERVER_ERROR,
              message: `Something went wrong when logging the user out: ${err.message}`,
              details: 'Logout resolver. Error originated from the Redis store.',
            });
          }
        });

        response.clearCookie('qid');

        return true;
      }

      return throwError({
        status: throwError.Errors.EStatuses.INTERNAL_SERVER_ERROR,
        message: 'Not logged in. No user found in session.',
      });
    },
  },
  Mutation: {
    async defaultAuthentication(_, args, { request, redis, dbContext, stripe }): Promise<User | IThrowError> {
      // Hashing the password before storing it in the database.
      const hashedPassword = await bcrypt.hash(args.input.password, 12);

      // Start a Client Session since we want the sign up process to be atomic.
      const session = await dbContext.connection!.startSession();

      // Use withTransaction to start a transaction, execute the callback, and commit (or abort on error).
      // Note: The callback for withTransaction MUST be async and/or return a Promise.
      try {
        let user: User;

        await session.withTransaction(
          async () => {
            // Check that the free plan exists:
    
            const plan = await dbContext.collections.Plans.model.findOne({ 'price.unitAmount': 0 }).lean();
    
            if (!plan) {
              throw throwError({
                status: throwError.Errors.EStatuses.BAD_REQUEST,
                message: `Free Plan does not exist.`,
              });
            }

            // Creating the user's document in the Template DB:
            user = await new dbContext.collections.Users.model({
              email: args.input.email.toLowerCase(),
              firstName: args.input.firstName,
              lastName: args.input.lastName,
              displayName: args.input.displayName,
              password: hashedPassword,
            }).save({ session });
    
            // Creating the related Stripe customer and saving it to the database:
    
            const stripeCustomer = await createStripeCustomer(stripe, user);
    
            const customer = await new dbContext.collections.Customers.model({
              userId: user.uuid,
              externalId: stripeCustomer.id,
              currency: StripeSupportedCurrencies.USD,
              paymentMethods: [],
              externalDefaultPaymentMethodId: undefined,
              invoicePrefix: undefined,
            }).save({ session });
    
            // Create Stripe subscription:
            const stripeSubscription = await createStripeSubscription(
              stripe,
              customer,
              plan,
            );
    
            // Save Stripe data & references to the TemplateDB:
            await saveStripeData(
              dbContext,
              customer,
              plan,
              null,
              stripeSubscription,
              session,
            );
    
            // If there's a user logged in the existing session, delete it.
            if (request.session.userId) {
              await removeAllUserSessions(request.session.userId, redis);
            }
    
            // Log the user in by saving his/her session.
    
            request.session.userId = user.uuid;
    
            if (request.session.userId) {
              await addUserSession(redis, user.uuid, request.session.userId);
            }
          },
          {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' },
          },
        );

        await session.commitTransaction();

        session.endSession();

        return user!;
      } catch (error) {
        session.endSession();

        return throwError({
          status: throwError.Errors.EStatuses.AUTHENTICATION,
          message: `Error while creating a new user: ${error.message}`,
        });
      }
    },
  },
}

export default resolvers;
