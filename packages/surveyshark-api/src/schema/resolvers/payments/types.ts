// Libraries
import {
  Plan,
  Customer,
  Subscription,
} from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IPaymentsResolverMap extends IResolvers {
  Query: {
    readPlans: Resolver<null, null, Promise<Plan[]>>;
    readSelfCustomer: Resolver<null, null, Promise<Customer | null>>;
    readSelfSubscription: Resolver<null, null, Promise<Subscription | null>>;
  },
  Mutation: {
    createSelfSubscription: Resolver<null, GQL.MutationCreateSelfSubscriptionArgs, Promise<Subscription | IThrowError>>;
    updateSelfSubscription: Resolver<null, GQL.MutationUpdateSelfSubscriptionArgs, Promise<Subscription | IThrowError>>;
    cancelSelfSubscription: Resolver<null, GQL.MutationCancelSelfSubscriptionArgs, Promise<Subscription | IThrowError>>;
  },
}
