// Libraries
import { Plan, Customer, Subscription } from '@atomly/surveyshark-collections-lib';

// Types
import { IPaymentsResolverMap } from './types';

// Utils
import { throwError, IThrowError } from '../../../utils';

// Dependencies
import { createStripePaymentMethod, createStripeSubscription, saveStripeData, updateStripeData, updateStripePaymentMethod, updateStripeSubscription } from '../../../stripe';

const resolvers: IPaymentsResolverMap = {
  Query: {
    async readPlans(_, __, { dbContext }): Promise<Plan[]> {
      const plans = await dbContext.collections.Plans.model.find({});
      return plans;
    },
    async readSelfCustomer(_, __, { request, dbContext }): Promise<Customer | null> {
      if (request.session.userId) {
        const customer = await dbContext.collections.Customers.model.findOne({
          userId: request.session.userId,
        });
        return customer;
      }
      return null;
    },
    async readSelfSubscription(_, __, { request, dbContext }): Promise<Subscription | null> {
      if (request.session.userId) {
        const subscription = await dbContext.collections.Subscriptions.model.findOne({
          userId: request.session.userId,
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
      if (request.session.userId) {
        const { planId } = input;

        // 1. Check the user in the session, and if the planId is related to an existing plan:

        const user = await dbContext.collections.Users.model.findOne({ uuid: request.session.userId }).lean();

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

        // 3. Fetch the user's Stripe customer:

        const customer = await dbContext.collections.Customers.model.findOne({ userId: user.uuid });

        if (!customer) {
          return throwError({
            status: throwError.Errors.EStatuses.INTERNAL_SERVER_ERROR,
            message: `User has no existing customer.`,
            details: `User has no existing customer with userId of ${user.uuid}`,
          });
        }

        // 4. Create a Stripe Payment Method:

        const stripePaymentMethod = plan.price.unitAmount ?
          await createStripePaymentMethod(
            stripe,
            customer,
            details,
            card,
            address,
          ) : null;

        // 5. Create Stripe subscription:

        const stripeSubscription = await createStripeSubscription(
          stripe,
          customer,
          plan,
        );

        // 6. Save Stripe data & references to the SurveySharkDB:

        const { subscription } = await saveStripeData(
          dbContext,
          customer,
          plan,
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
      if (request.session.userId) {
        const { planId, subscriptionId } = input;

        // 1. Check the user in the session:

        const user = await dbContext.collections.Users.model.findOne({ uuid: request.session.userId }).lean();

        if (!user) {
          return throwError({
            status: throwError.Errors.EStatuses.AUTHENTICATION,
            message: `Invalid user session.`,
          });
        }

        // 2. Check if the user has a current subscription and fetch the plan of the
        // new planId if any:

        const currentSubscription = await dbContext.collections.Subscriptions.model.findOne({
          userId: user.uuid,
        }).lean();

        if (!currentSubscription) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `User has no existing active subscription.`,
          });
        } else if (currentSubscription.uuid !== subscriptionId) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Subscription ID does not match the current user's active subscription.`,
          });
        }

        const plan = planId ?
          await dbContext.collections.Plans.model.findOne({ uuid: planId }).lean()
          : null;

        // 3. Fetch the customer document:

        const customer = await dbContext.collections.Customers.model.findOne({
          userId: user.uuid,
        }).lean();

        if (!customer) {
          return throwError({
            status: throwError.Errors.EStatuses.INTERNAL_SERVER_ERROR,
            message: `User has no existing customer.`,
            details: `User has no existing customer with userId of ${user.uuid}`,
          });
        }

        // 4. If necessary, update a Stripe Payment Method:

        const stripePaymentMethod = plan?.price.unitAmount ?
          await updateStripePaymentMethod(
            stripe,
            customer,
            details,
            card,
            address,
          ) :
          null;

        // 5. If necessary, update Stripe subscription to a new plan:

        const stripeSubscription = await updateStripeSubscription(
          stripe,
          currentSubscription,
          plan,
        );

        // 6. If necessary, update Stripe data & references to the SurveySharkDB:

        const { subscription } = await updateStripeData(
          dbContext,
          customer,
          plan,
          currentSubscription,
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
    async cancelSelfSubscription(
      _,
      { input },
      { request, dbContext, stripe },
    ): Promise<Subscription | IThrowError> {
      if (request.session.userId) {
        const { subscriptionId } = input;

        // 1. Check the user in the session:

        const user = await dbContext.collections.Users.model.findOne({ uuid: request.session.userId }).lean();

        if (!user) {
          return throwError({
            status: throwError.Errors.EStatuses.AUTHENTICATION,
            message: `Invalid user session.`,
          });
        }

        // 2. Check that the free plan exists to downgrade the current subscription to the
        // free tier:

        const plan = await dbContext.collections.Plans.model.findOne({ 'price.unitAmount': 0 }).lean();

        if (!plan) {
          throw throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Free Plan does not exist.`,
          });
        }

        // 3. Check if the user has a current subscription, and check if the subscription ID matches the one
        // send in the input parameters:

        const currentSubscription = await dbContext.collections.Subscriptions.model.findOne({
          userId: user.uuid,
          // status: StripeSubscriptionStatuses.ACTIVE,
        }).lean();

        if (!currentSubscription) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `User has no current subscription.`,
          });
        } else if (currentSubscription.uuid !== subscriptionId) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Subscription ID does not match the current user's subscription.`,
          });
        }

        // 4. Check the customer document:

        const customer = await dbContext.collections.Customers.model.findOne({
          userId: user.uuid,
        }).lean();

        if (!customer) {
          return throwError({
            status: throwError.Errors.EStatuses.INTERNAL_SERVER_ERROR,
            message: `User has no existing customer.`,
            details: `User has no existing customer with userId of ${user.uuid}`,
          });
        }

        // 5. Cancel the subscription:

        // TODO: Issue Stripe refund.
        // https://stripe.com/docs/refunds

        const stripeSubscription = await updateStripeSubscription(
          stripe,
          currentSubscription,
          plan,
        );

        // 6. Update Stripe data & references to the SurveySharkDB:

        const { subscription } = await updateStripeData(
          dbContext,
          customer,
          plan,
          currentSubscription,
          null,
          stripeSubscription,
        );

        return subscription;
      }

      return throwError({
        status: throwError.Errors.EStatuses.UNATHORIZED,
        message: `User not logged in.`,
      });
    },
  },
}

export default resolvers;
