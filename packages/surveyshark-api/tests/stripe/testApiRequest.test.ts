// Libraries
import 'reflect-metadata';
import path from 'path';
import Stripe from 'stripe';
import { Config } from '@atomly/config';

// Dependencies
import { resolveEnv } from '../../src/env/index';
import { StripeLoader } from '../../src/config/stripe';

function resolveConfigFileLoation(fileLocation: string): { fileLocationUri: string } {
  return { fileLocationUri: `file://${path.resolve(__dirname, '..', '..', fileLocation).replace(/\\/g, '/')}` };
}

describe('stripe API requests using .env.test stripe configuration', () => {
  let stripe: Stripe;

  const config = new Config(
    new StripeLoader(resolveConfigFileLoation(process.env.STRIPE_CONFIG_FILE_LOCATION!)),
  );

  beforeAll(async () => {
    await config.load();
    stripe = new Stripe(
      config.stripe.secretKey,
      {
        apiVersion: '2020-08-27',
      },
    );
  });

  /**
   * Testing test API request as shown in the [documentation](https://stripe.com/docs/development/quickstart).
   */
  test('API request is successful', async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com',
    });

    expect(paymentIntent).toMatchObject({
      // "id": "pi_1DRuHnHgsMRlo4MtwuIAUe6u",
      "object": "payment_intent",
      "amount": 1000,
      "amount_capturable": 0,
      "amount_received": 0,
      "application": null,
      "application_fee_amount": null,
      "canceled_at": null,
      "cancellation_reason": null,
      "capture_method": "automatic",
      "charges": {
        "object": "list",
        "data": [],
        "has_more": false,
        "total_count": 0,
        // "url": "/v1/charges?payment_intent=pi_1DRuHnHgsMRlo4MtwuIAUe6u"
      },
      // "client_secret": "{{PAYMENT_INTENT_CLIENT_SECRET}}",
      "confirmation_method": "automatic",
      // "created": 1556123069,
      "currency": "usd",
      "customer": null,
      "description": null,
      "invoice": null,
      "last_payment_error": null,
      "livemode": false,
      "metadata": {},
      "next_action": null,
      "on_behalf_of": null,
      "payment_method": null,
      "payment_method_types": [
        "card",
      ],
      "receipt_email": "jenny.rosen@example.com",
      "review": null,
      "shipping": null,
      "source": null,
      "statement_descriptor": null,
      "status": "requires_payment_method",
      "transfer_data": null,
      "transfer_group": null,
    });
  });
})

describe('stripe API requests using .env.dev stripe configuration', () => {
  const env = resolveEnv(resolveEnv.ENodeEnvConfig.DEVELOPMENT);

  let stripe: Stripe;

  const config = new Config(
    new StripeLoader(resolveConfigFileLoation(env.STRIPE_CONFIG_FILE_LOCATION!)),
  );

  beforeAll(async () => {
    await config.load();
    stripe = new Stripe(
      config.stripe.secretKey,
      {
        apiVersion: '2020-08-27',
      },
    );
  });

  /**
   * Testing test API request as shown in the [documentation](https://stripe.com/docs/development/quickstart).
   */
  test('API request is successful', async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: 'jenny.rosen@example.com',
    });

    expect(paymentIntent).toMatchObject({
      // "id": "pi_1DRuHnHgsMRlo4MtwuIAUe6u",
      "object": "payment_intent",
      "amount": 1000,
      "amount_capturable": 0,
      "amount_received": 0,
      "application": null,
      "application_fee_amount": null,
      "canceled_at": null,
      "cancellation_reason": null,
      "capture_method": "automatic",
      "charges": {
        "object": "list",
        "data": [],
        "has_more": false,
        "total_count": 0,
        // "url": "/v1/charges?payment_intent=pi_1DRuHnHgsMRlo4MtwuIAUe6u"
      },
      // "client_secret": "{{PAYMENT_INTENT_CLIENT_SECRET}}",
      "confirmation_method": "automatic",
      // "created": 1556123069,
      "currency": "usd",
      "customer": null,
      "description": null,
      "invoice": null,
      "last_payment_error": null,
      "livemode": false,
      "metadata": {},
      "next_action": null,
      "on_behalf_of": null,
      "payment_method": null,
      "payment_method_types": [
        "card",
      ],
      "receipt_email": "jenny.rosen@example.com",
      "review": null,
      "shipping": null,
      "source": null,
      "statement_descriptor": null,
      "status": "requires_payment_method",
      "transfer_data": null,
      "transfer_group": null,
    });
  });
})
