// Libraries
import Stripe from 'stripe';
import { StripeSupportedCurrencies, TemplateDBContext, User, Plan, Customer, Subscription, StripeSubscriptionStatuses, StripeSubscriptionCollectionMethods, CustomerPaymentMethod } from '@atomly/entities-lib-boilerplate';

// Types
import { ClientSession } from 'mongoose';
import { GQL } from '../types';

// Dependencies
import { throwError } from '../utils';

/**
 * Creates a Stripe customer then returns it.
 * @param stripe - Stripe instance.
 * @param user - Template User document.
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
 * @param customer - Template Stripe Customer document.
 * @param details - Customer details information for the payment method.
 * @param card - Customer card information for the payment method.
 * @param address - Customer address information for the payment method.
 */
export async function createStripePaymentMethod(
  stripe: Stripe,
  customer: Customer,
  details: GQL.MutationCreateSelfSubscriptionDetails,
  card: GQL.MutationCreateSelfSubscriptionCard,
  address: GQL.MutationCreateSelfSubscriptionAddress,
): Promise<Stripe.PaymentMethod> {
  const { email, name, phone } = details;
  const { number, expYear, expMonth, cvc } = card;
  const { city, country, line1, line2, postalCode, state } = address;

  const paymentMethodCreateParams: Stripe.PaymentMethodCreateParams = {
    type: 'card',
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
    customer: customer.externalId,
  });

  await stripe.customers.update(customer.externalId, {
    invoice_settings: {
      default_payment_method: stripePaymentMethod.id,
    },
  });

  return stripePaymentMethod;
}

/**
 * Creates a Stripe subscription then returns it.
 * @param stripe - Stripe instance.
 * @param customer - Template Stripe Customer document.
 * @param plan - Template Plan document.
 */
export async function createStripeSubscription(
  stripe: Stripe,
  customer: Customer,
  plan: Plan,
): Promise<Stripe.Subscription> {
  const stripeSubscription = await stripe.subscriptions.create({
    customer: customer.externalId,
    items: [{ price: plan.price.externalId }],
    expand: ['latest_invoice.payment_intent'],
  });

  return stripeSubscription;
}

/**
 * Saves Stripe relevant payment data (customer, payment method, and subscription)
 * in the Template database. Returns the Customer and Subscription document.
 * @param dbContext - Template DB Context.
 * @param customer - Template Stripe Customer document.
 * @param plan - Template Plan document.
 * @param stripePaymentMethod - Stripe PaymentMethod object.
 * @param stripeSubscription - Stripe Subscription object.
 * @param {optional} session - MongoDB session for atomic transactions.
 */
export async function saveStripeData(
  dbContext: TemplateDBContext,
  customer: Customer,
  plan: Plan,
  stripePaymentMethod: Stripe.PaymentMethod | null,
  stripeSubscription: Stripe.Subscription,
  session?: ClientSession,
): Promise<{ customer: Customer, subscription: Subscription}> {
  const [updatedCustomer, subscription] = await Promise.all([
    stripePaymentMethod ?
      dbContext.collections.Customers.model.findOneAndUpdate(
        { uuid: customer.uuid },
        {
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
        { new: true, session },
      ) : 
      undefined,
    new dbContext.collections.Subscriptions.model({
      userId: customer.userId,
      planId: plan.uuid,
      externalId: stripeSubscription.id,
      externalCustomerId: customer.externalId,
      currentPeriodStart: new Date(stripeSubscription.current_period_start),
      currentPeriodEnd: new Date(stripeSubscription.current_period_end),
      items: stripeSubscription.items.data.map(d => ({
        externalId: d.id!,
        externalPriceId: d.price.id,
        quantity: d.quantity!,
      })),
      status: stripeSubscription.status as StripeSubscriptionStatuses,
      collectionMethod: stripeSubscription.collection_method as StripeSubscriptionCollectionMethods,
      externalLatestInvoiceId: (stripeSubscription.latest_invoice as Stripe.Invoice)?.id,
    }).save({ session }),
  ]);

  return {
    customer: updatedCustomer ?? customer,
    subscription: subscription!,
  };
}

/**
 * If necessary, update a Stripe payment method. Returns the updated
 * payment method or null.
 * @param stripe - Stripe instance.
 * @param customer - Template DB customer document.
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

  const customerPaymentMethod: CustomerPaymentMethod | undefined = customer.paymentMethods.find(i => (
    i.externalId === customer.externalDefaultPaymentMethodId
  ))!;

  const shouldUpdatePaymentMethodCard = Boolean(number && cvc);

  const paymentMethodUpdateParams: Stripe.PaymentMethodUpdateParams = {
    card: {
      exp_year: expYear ?? customerPaymentMethod?.details.card.expYear,
      exp_month: expMonth ?? customerPaymentMethod?.details.card.expMonth,
    },
    billing_details: {
      address: {
        city: city ?? customerPaymentMethod?.details.address.city,
        country: country ?? customerPaymentMethod?.details.address.country,
        line1: line1 ?? customerPaymentMethod?.details.address.line1,
        line2: line2 ?? customerPaymentMethod?.details.address.line2,
        postal_code: postalCode ?? customerPaymentMethod?.details.address.postalCode,
        state: state ?? customerPaymentMethod?.details.address.state,
      },
      email: email ?? customerPaymentMethod?.details.email,
      name: name ?? customerPaymentMethod?.details.name,
      phone: phone ?? customerPaymentMethod?.details.phone,
    },
  };

  // If the card details have to be changed, then detach the previous
  // payment method from the user if necessary, then attach a new one.

  if (shouldUpdatePaymentMethodCard) {
    if (number && expYear && expMonth && cvc) {
      customerPaymentMethod?.externalId && await stripe.paymentMethods.detach(customerPaymentMethod.externalId);

      const paymentMethodCreateParams = Object.assign(
        paymentMethodUpdateParams,
        {
          type: 'card',
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

      await stripe.customers.update(customer.externalId, {
        invoice_settings: {
          default_payment_method: stripePaymentMethod.id,
        },
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
    customerPaymentMethod &&
    (
      shouldUpdateDetails ||
      shouldUpdateCard ||
      shouldUpdateAddress
    )
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
 * @param stripe - Stripe instance.
 * @param customer - Template DB customer document.
 * @param plan - Template DB plan document.
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
      proration_behavior: 'always_invoice',
    });

    return stripeSubscription;
  }

  return null;
}

/**
 * Saves Stripe relevant payment data (payment method, and subscription)
 * in the Template database. Returns the Customer and Subscription document.
 * @param dbContext - Template DB Context.
 * @param customer - Template DB customer document.
 * @param plan - Template Plan document.
 * @param subscription - Template DB subscription document.
 * @param stripePaymentMethod - Stripe PaymentMethod object.
 * @param stripeSubscription - Stripe Subscription object.
 * @param {optional} session - MongoDB session for atomic transactions.
 */
export async function updateStripeData(
  dbContext: TemplateDBContext,
  customer: Customer,
  plan: Plan | null,
  subscription: Subscription,
  stripePaymentMethod: Stripe.PaymentMethod | null,
  stripeSubscription: Stripe.Subscription | null,
  session?: ClientSession,
): Promise<{ customer: Customer, subscription: Subscription}> {
  const promises: (Promise<unknown> | undefined)[] = [];

  // If necessary, update the Customer with the Stripe new payment method information.
  promises.push(stripePaymentMethod ?
    dbContext.collections.Customers.model.findOneAndUpdate(
      { userId: customer.userId },
      {
        userId: customer.userId,
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
      { upsert: true, new: true, useFindAndModify: false, session },
    ).lean() as unknown as Promise<unknown>
    : undefined,
  );

  // If necessary, update the Subscription with the new Stripe subscription information.
  promises.push(stripeSubscription ?
    dbContext.collections.Subscriptions.model.findOneAndUpdate(
      { userId: customer.userId },
      (
        plan ?
          {
            userId: customer.userId,
            planId: plan.uuid,
            externalId: stripeSubscription.id,
            externalCustomerId: customer.externalId,
            currentPeriodStart: new Date(stripeSubscription.current_period_start),
            currentPeriodEnd: new Date(stripeSubscription.current_period_end),
            items: stripeSubscription.items.data.map(d => ({
              externalId: d.id!,
              externalPriceId: d.price.id,
              quantity: d.quantity!,
            })),
            status: stripeSubscription.status as StripeSubscriptionStatuses,
            collectionMethod: stripeSubscription.collection_method as StripeSubscriptionCollectionMethods,
            externalLatestInvoiceId: (stripeSubscription.latest_invoice as Stripe.Invoice)?.id,
          } :
          {
            userId: customer.userId,
            externalId: stripeSubscription.id,
            externalCustomerId: customer.externalId,
            currentPeriodStart: new Date(stripeSubscription.current_period_start),
            currentPeriodEnd: new Date(stripeSubscription.current_period_end),
            items: stripeSubscription.items.data.map(d => ({
              externalId: d.id!,
              externalPriceId: d.price.id,
              quantity: d.quantity!,
            })),
            status: stripeSubscription.status as StripeSubscriptionStatuses,
            collectionMethod: stripeSubscription.collection_method as StripeSubscriptionCollectionMethods,
            externalLatestInvoiceId: (stripeSubscription.latest_invoice as Stripe.Invoice)?.id,
          }
      ),
      { upsert: true, new: true, useFindAndModify: false, session },
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
 * @param subscription - Template DB subscription document.
 */
export async function cancelStripeSubscription(
  stripe: Stripe,
  subscription: Subscription,
): Promise<Stripe.Subscription> {
  const stripeSubscription = await stripe.subscriptions.del(subscription.externalId, {
    prorate: true,
  });

  return stripeSubscription;
}
