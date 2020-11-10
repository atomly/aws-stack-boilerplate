/* eslint-disable no-console */

// Libraries
import Stripe from 'stripe';
import { Request, Response } from 'express';
// import { SurveySharkDBContext } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { config } from '../config';

/**
 * Stripe webhook.
 * @param stripe 
 * @param stripeConfig 
 */
export function stripeWebhooks(stripe: Stripe, stripeConfig: typeof config['stripe']) {
  return async (req: Request, res: Response): Promise<Response> => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature']!,
        stripeConfig.webhookSecret,
      );
    } catch (err) {
      console.log(err);
      console.log(`⚠️  Webhook signature verification failed.`);
      console.log(`⚠️  Check the env file and enter the correct webhook secret.`);
      return res.sendStatus(400);
    }

    // Extract the object from the event.
    const dataObject = event.data.object;
    console.log('dataObject: ', dataObject);

    // Handle the event
    // Review important events for Billing webhooks
    // https://stripe.com/docs/billing/webhooks
    // Remove comment to see the various objects sent for this sample
    switch (event.type) {
      case 'invoice.paid':
        // Used to provision services after the trial has ended.
        // The status of the invoice will show up as paid. Store the status in your
        // database to reference when a user accesses your service to avoid hitting rate limits.
        console.log('event: ', event);
        break;
      case 'invoice.payment_failed':
        // If the payment fails or the customer does not have a valid payment method,
        //  an invoice.payment_failed event is sent, the subscription becomes past_due.
        // Use this webhook to notify your user that their payment has
        // failed and to retrieve new card details.
        console.log('event: ', event);
        break;
      case 'customer.subscription.deleted':
        if (event.request != null) {
          // handle a subscription cancelled by your request
          // from above.
        } else {
          // handle subscription cancelled automatically based
          // upon your subscription settings.
        }
        console.log('event: ', event);
        break;
      default:
      // Unexpected event type
    }

    return res.sendStatus(200);
  }
}
