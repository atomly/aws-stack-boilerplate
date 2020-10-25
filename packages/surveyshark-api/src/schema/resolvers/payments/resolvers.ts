// Libraries
import { Plan, Customer, Subscription, StripeSubscriptionStatuses } from '@atomly/surveyshark-collections-lib';

// Types
import { IPaymentsResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

// Dependencies
import { createStripeCustomer, createStripePaymentMethod, createStripeSubscription, saveStripeData } from './utils';

const resolvers: IPaymentsResolverMap = {
  Query: {
    async readPlans(_, __, { dbContext }): Promise<Plan[]> {
      const plans = await dbContext.collections.Plans.model.find({});
      return plans;
    },
    async readSelfCustomer(_, __, { request, dbContext }): Promise<Customer | null> {
      if (request.session?.userId) {
        const customer = await dbContext.collections.Customers.model.findOne({
          userId: request.session.userId,
        });
        return customer;
      }
      return null;
    },
    async readSelfSubscription(_, __, { request, dbContext }): Promise<Subscription | null> {
      if (request.session?.userId) {
        const subscription = await dbContext.collections.Subscriptions.model.findOne({
          userId: request.session.userId,
          status: StripeSubscriptionStatuses.ACTIVE,
        });
        return subscription;
      }
      return null;
    },
  },
  Mutation: {
    async createSelfSubscription(
      _,
      { input, details, card, address },
      { request, dbContext, stripe },
    ): Promise<Subscription | IThrowError> {
      if (request.session?.userId) {
        const { planId } = input;

        // 1. Check the user in the session, and if the planId is related to an existing plan:

        const user = await dbContext.collections.Users.model.findOne({ uuid: request.session.userId });

        if (!user) {
          return throwError({
            status: throwError.Errors.EStatuses.AUTHENTICATION,
            message: `Invalid user session.`,
          });
        }

        const plan = await dbContext.collections.Plans.model.findOne({ uuid: planId }).lean();

        if (!plan) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Invalid plan ID: ${planId}`,
          });
        }

        // 2. Check if the user has an existing subscription.

        const existingSubscription = await dbContext.collections.Subscriptions.model.findOne({
          userId: user.uuid,
        }).lean();

        if (existingSubscription) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `User already has an existing subscription: ${existingSubscription.uuid}`,
          });
        }

        // 3. Create the Stripe customer:

        const stripeCustomer = await createStripeCustomer(stripe, user);

        // 4. Create a Stripe Payment Method:

        const stripePaymentMethod = await createStripePaymentMethod(
          stripe,
          stripeCustomer,
          details,
          card,
          address,
        );

        // 5. Create Stripe subscription:

        const stripeSubscription = await createStripeSubscription(
          stripe,
          stripeCustomer,
          plan,
        );

        // 6. Save Stripe data & references to the SurveySharkDB:

        const { subscription } = await saveStripeData(
          dbContext,
          user.uuid,
          stripeCustomer,
          stripePaymentMethod,
          stripeSubscription,
        );

        return subscription;
      }

      return throwError({
        status: throwError.Errors.EStatuses.UNATHORIZED,
        message: `User not logged in.`,
      });
    },
    async updateSelfSubscription(
      _,
      { input, details, card, address },
      { request, dbContext, stripe },
    ): Promise<Subscription | IThrowError> {
    },
    async cancelSelfSubscription(
      _,
      { input, details, card, address },
      { request, dbContext, stripe },
    ): Promise<Subscription | IThrowError> {
    },
  },
}

export default resolvers;
