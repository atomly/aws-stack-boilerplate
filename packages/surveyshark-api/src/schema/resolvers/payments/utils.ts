// Libraries
import Stripe from 'stripe';
import { StripeSupportedCurrencies, SurveySharkDBContext, User, Plan, Customer, Subscription, StripeSubscriptionStatuses, StripeSubscriptionCollectionMethods } from '@atomly/surveyshark-collections-lib';

// Types
import { GQL } from '../../../types';

// Dependencies
import { throwError } from '../../../utils';

/**
 * Creates a Stripe customer then returns it.
 * @param stripe - Stripe instance.
 * @param user - SurveyShark User document.
 */
export async function createStripeCustomer(stripe: Stripe, user: User): Promise<Stripe.Customer> {
  const stripeCustomer = await stripe.customers.create({
    email: user.email,
    name: `${user.lastName}, ${user.firstName}`,
    description: user.displayName,
  });

  return stripeCustomer;
}

/**
 * Creates a Stripe payment method, attaches it to the customer, then returns it.
 * @param stripe - Stripe instance.
 * @param stripeCustomer - Stripe customer.
 * @param details - Customer details information for the payment method.
 * @param card - Customer card information for the payment method.
 * @param address - Customer address information for the payment method.
 */
export async function createStripePaymentMethod(
  stripe: Stripe,
  stripeCustomer: Stripe.Customer,
  details: GQL.MutationCreateSelfSubscriptionDetails,
  card: GQL.MutationCreateSelfSubscriptionCard,
  address: GQL.MutationCreateSelfSubscriptionAddress,
): Promise<Stripe.PaymentMethod> {
  const { email, name, phone } = details;
  const { number, expYear, expMonth, cvc } = card;
  const { city, country, line1, line2, postalCode, state } = address;

  const paymentMethodCreateParams: Stripe.PaymentMethodCreateParams = {
    type: 'card',
    customer: stripeCustomer.id,
    card: {
      number,
      exp_year: expYear,
      exp_month: expMonth,
      cvc,
    },
    billing_details: {
      address: {
        city: city!,
        country: country!,
        line1: line1!,
        line2: line2!,
        postal_code: postalCode!,
        state: state!,
      },
      email: email!,
      name: name!,
      phone: phone!,
    },
  };

  const stripePaymentMethod = await stripe.paymentMethods.create(paymentMethodCreateParams);

  await stripe.paymentMethods.attach(stripePaymentMethod.id, {
    customer: stripeCustomer.id,
  });

  return stripePaymentMethod;
}

/**
 * Creates a Stripe subscription then returns it.
 * @param stripe - Stripe instance.
 * @param stripeCustomer - Stripe customer.
 * @param plan - SurveyShark Plan document.
 */
export async function createStripeSubscription(
  stripe: Stripe,
  stripeCustomer: Stripe.Customer,
  plan: Plan,
): Promise<Stripe.Subscription> {
  const stripeSubscription = await stripe.subscriptions.create({
    customer: stripeCustomer.id,
    items: [{ price: plan.price.externalId }],
    expand: ['latest_invoice.payment_intent'],
  });

  return stripeSubscription;
}

/**
 * Saves Stripe relevant payment data (customer, payment method, and subscription)
 * in the SurveyShark database. Returns the Customer and Subscription document.
 * @param dbContext - SurveyShark DB Context.
 * @param userId - SurbeyShark User document UUID.
 * @param stripeCustomer - Stripe Customer object.
 * @param stripePaymentMethod - Stripe PaymentMethod object.
 * @param stripeSubscription - Stripe Subscription object.
 */
export async function saveStripeData(
  dbContext: SurveySharkDBContext,
  userId: string,
  stripeCustomer: Stripe.Customer,
  stripePaymentMethod: Stripe.PaymentMethod,
  stripeSubscription: Stripe.Subscription,
): Promise<{ customer: Customer, subscription: Subscription}> {
  const [customer, subscription] = await Promise.all([
    dbContext.collections.Customers.model.findOneAndUpdate(
      { userId },
      {
        userId,
        externalId: stripeCustomer.id,
        currency: StripeSupportedCurrencies.USD,
        externalDefaultPaymentMethodId: stripePaymentMethod.id,
        paymentMethods: [{
          externalId: stripePaymentMethod.id,
          details: {
            card: {
              lastFourDigits: stripePaymentMethod.card!.last4!,
              expMonth: stripePaymentMethod.card!.exp_month!,
              expYear: stripePaymentMethod.card!.exp_year!,
              fingerprint: stripePaymentMethod.card!.fingerprint!,
            },
            address: {
              city: stripePaymentMethod.billing_details.address?.city ?? undefined,
              country: stripePaymentMethod.billing_details.address?.country ?? undefined,
              line1: stripePaymentMethod.billing_details.address?.line1 ?? undefined,
              line2: stripePaymentMethod.billing_details.address?.line2 ?? undefined,
              postalCode: stripePaymentMethod.billing_details.address?.postal_code ?? undefined,
              state: stripePaymentMethod.billing_details.address?.state ?? undefined,
            },
            email: stripePaymentMethod.billing_details.email ?? undefined,
            name: stripePaymentMethod.billing_details.name ?? undefined,
            phone: stripePaymentMethod.billing_details.phone ?? undefined,
          },
        }],
      },
      { upsert: true, new: true },
    ).lean(),
    dbContext.collections.Subscriptions.model.findOneAndUpdate(
      { userId },
      {
        userId,
        externalId: stripeSubscription.id,
        externalCustomerId: stripeSubscription.customer as string,
        currentPeriodStart: new Date(stripeSubscription.current_period_start),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end),
        items: stripeSubscription.items.data.map(d => ({
          externalId: d.id!,
          externalPriceId: d.price.id,
          quantity: d.quantity!,
        })),
        status: stripeSubscription.status as StripeSubscriptionStatuses,
        collectionMethod: stripeSubscription.collection_method as StripeSubscriptionCollectionMethods,
        externalLatestInvoiceId: stripeSubscription.latest_invoice as string,
      },
      { upsert: true, new: true },
    ).lean(),
  ]);

  return {
    customer: customer!,
    subscription: subscription!,
  };
}

/**
 * If necessary, update a Stripe payment method. Returns the updated
 * payment method or null.
 * @param stripe - Stripe instance.
 * @param customer - SurveyShark DB customer document.
 * @param details - Customer details information for the payment method.
 * @param card - Customer card information for the payment method.
 * @param address - Customer address information for the payment method.
 */
export async function updateStripePaymentMethod(
  stripe: Stripe,
  customer: Customer,
  details: GQL.MutationUpdateSelfSubscriptionDetails,
  card: GQL.MutationUpdateSelfSubscriptionCard,
  address: GQL.MutationUpdateSelfSubscriptionAddress,
): Promise<Stripe.PaymentMethod | null> {
  const { email, name, phone } = details;
  const { number, expYear, expMonth, cvc } = card;
  const { city, country, line1, line2, postalCode, state } = address;

  const customerPaymentMethod = customer.paymentMethods.find(i => (
    i.externalId === customer.externalDefaultPaymentMethodId
  ))!;

  const shouldUpdatePaymentMethodCard = Boolean(number && cvc);

  const paymentMethodUpdateParams: Stripe.PaymentMethodUpdateParams = {
    card: {
      exp_year: expYear ?? customerPaymentMethod.details.card.expYear,
      exp_month: expMonth ?? customerPaymentMethod.details.card.expMonth,
    },
    billing_details: {
      address: {
        city: city ?? customerPaymentMethod.details.address.city,
        country: country ?? customerPaymentMethod.details.address.country,
        line1: line1 ?? customerPaymentMethod.details.address.line1,
        line2: line2 ?? customerPaymentMethod.details.address.line2,
        postal_code: postalCode ?? customerPaymentMethod.details.address.postalCode,
        state: state ?? customerPaymentMethod.details.address.state,
      },
      email: email ?? customerPaymentMethod.details.email,
      name: name ?? customerPaymentMethod.details.name,
      phone: phone ?? customerPaymentMethod.details.phone,
    },
  };

  // If the card details have to be changed, then detach the previous
  // payment method from the user, then attach a new one.

  if (shouldUpdatePaymentMethodCard) {
    if (number && expYear && expMonth && cvc) {
      await stripe.paymentMethods.detach(customerPaymentMethod.externalId);

      const paymentMethodCreateParams = Object.assign(
        paymentMethodUpdateParams,
        {
          type: 'card',
          customer: customer.externalId,
          card: {
            number,
            exp_year: expYear,
            exp_month: expMonth,
            cvc,
          },
        },
      ) as Stripe.PaymentMethodCreateParams;

      const stripePaymentMethod = await stripe.paymentMethods.create(paymentMethodCreateParams);

      await stripe.paymentMethods.attach(stripePaymentMethod.id, {
        customer: customer.externalId,
      });

      return stripePaymentMethod;
    } else {
      throwError({
        status: throwError.Errors.EStatuses.BAD_REQUEST,
        message: `Invalid Card parameters.`,
      });
    }
  }

  const shouldUpdateDetails = Boolean(email ?? name ?? phone);

  const shouldUpdateCard = Boolean(expYear ?? expMonth);

  const shouldUpdateAddress = Boolean(city ?? country ?? line1 ?? line2 ?? postalCode ?? state);

  if (
    shouldUpdateDetails ||
    shouldUpdateCard ||
    shouldUpdateAddress
  ) {
    const stripePaymentMethod = await stripe.paymentMethods.update(
      customerPaymentMethod.externalId,
      paymentMethodUpdateParams,
    );
  
    return stripePaymentMethod;
  }

  return null;
}

/**
 * If necessary, update a Stripe subscription method. Returns the updated
 * subscription or null.
 * @param dbContext - SurveyShark DB Context.
 * @param stripe - Stripe instance.
 * @param customer - SurveyShark DB customer document.
 * @param plan - SurveyShark DB plan document.
 */
export async function updateStripeSubscription(
  stripe: Stripe,
  subscription: Subscription,
  plan: Plan | null,
): Promise<Stripe.Subscription | null> {
  if (!plan) {
    return null;
  }

  const isNewPlan = !subscription.items.find(i => (
    i.externalPriceId === plan.price.externalId
  ));

  if (isNewPlan) {
    const stripeSubscription = await stripe.subscriptions.update(subscription.externalId, {
      items: subscription.items.map(i => ({
        id: i.externalId,
        price: plan.price.externalId,
      })),
      expand: ['latest_invoice.payment_intent'],
    });

    return stripeSubscription;
  }

  return null;
}

/**
 * Saves Stripe relevant payment data (payment method, and subscription)
 * in the SurveyShark database. Returns the Customer and Subscription document.
 * @param dbContext - SurveyShark DB Context.
 * @param userId - SurbeyShark User document UUID.
 * @param customer - SurveyShark DB customer document.
 * @param subscription - SurveyShark DB subscription document.
 * @param stripePaymentMethod - Stripe PaymentMethod object.
 * @param stripeSubscription - Stripe Subscription object.
 */
export async function updateStripeData(
  dbContext: SurveySharkDBContext,
  userId: string,
  customer: Customer,
  subscription: Subscription,
  stripePaymentMethod: Stripe.PaymentMethod | null,
  stripeSubscription: Stripe.Subscription | null,
): Promise<{ customer: Customer, subscription: Subscription}> {
  const promises: (Promise<unknown> | undefined)[] = [];

  // If necessary, update the Customer with the Stripe new payment method information.
  promises.push(stripePaymentMethod ?
    dbContext.collections.Customers.model.findOneAndUpdate(
      { userId },
      {
        userId,
        externalId: customer.externalId,
        currency: StripeSupportedCurrencies.USD,
        externalDefaultPaymentMethodId: stripePaymentMethod.id,
        paymentMethods: [{
          externalId: stripePaymentMethod.id,
          details: {
            card: {
              lastFourDigits: stripePaymentMethod.card!.last4!,
              expMonth: stripePaymentMethod.card!.exp_month!,
              expYear: stripePaymentMethod.card!.exp_year!,
              fingerprint: stripePaymentMethod.card!.fingerprint!,
            },
            address: {
              city: stripePaymentMethod.billing_details.address?.city ?? undefined,
              country: stripePaymentMethod.billing_details.address?.country ?? undefined,
              line1: stripePaymentMethod.billing_details.address?.line1 ?? undefined,
              line2: stripePaymentMethod.billing_details.address?.line2 ?? undefined,
              postalCode: stripePaymentMethod.billing_details.address?.postal_code ?? undefined,
              state: stripePaymentMethod.billing_details.address?.state ?? undefined,
            },
            email: stripePaymentMethod.billing_details.email ?? undefined,
            name: stripePaymentMethod.billing_details.name ?? undefined,
            phone: stripePaymentMethod.billing_details.phone ?? undefined,
          },
        }],
      },
      { upsert: true, new: true },
    ).lean() as unknown as Promise<unknown>
    : undefined,
  );

  // If necessary, update the Subscription with the new Stripe subscription information.
  promises.push(stripeSubscription ?
    dbContext.collections.Subscriptions.model.findOneAndUpdate(
      { userId },
      {
        userId,
        externalId: stripeSubscription.id,
        externalCustomerId: stripeSubscription.customer as string,
        currentPeriodStart: new Date(stripeSubscription.current_period_start),
        currentPeriodEnd: new Date(stripeSubscription.current_period_end),
        items: stripeSubscription.items.data.map(d => ({
          externalId: d.id!,
          externalPriceId: d.price.id,
          quantity: d.quantity!,
        })),
        status: stripeSubscription.status as StripeSubscriptionStatuses,
        collectionMethod: stripeSubscription.collection_method as StripeSubscriptionCollectionMethods,
        externalLatestInvoiceId: stripeSubscription.latest_invoice as string,
      },
      { upsert: true, new: true },
    ).lean() as unknown as Promise<unknown>
    : Promise.resolve(),
  );

  const [updatedCustomer, updatedSubscription] = await Promise.all(promises) as [Customer | undefined, Subscription | undefined];

  return {
    customer: updatedCustomer ?? customer,
    subscription: updatedSubscription ?? subscription,
  };
}

/**
 * Canels a Stripe subscription then returns it.
 * @param stripe - Stripe instance.
 * @param subscription - SurveyShark DB subscription document.
 */
export async function cancelStripeSubscription(
  stripe: Stripe,
  subscription: Subscription,
): Promise<Stripe.Subscription> {
  const stripeSubscription = await stripe.subscriptions.del(subscription.externalId);

  return stripeSubscription;
}
