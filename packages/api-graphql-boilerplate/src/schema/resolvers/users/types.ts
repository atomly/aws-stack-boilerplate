// Libraries
import { User } from '@atomly/entities-lib-boilerplate';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IUsersResolverMap extends IResolvers {
  Query: {
    user: Resolver<null, GQL.QueryUserArgs, Promise<User | null>>;
    // users: Resolver<null, null, Promise<User[]>>;
    me: Resolver<null, null, Promise<User | null>>;
    defaultAuthentication: Resolver<null, GQL.QueryDefaultAuthenticationArgs, Promise<User | IThrowError>>;
    // providerAuthentication: Resolver<null, GQL.QueryProviderAuthenticationArgs, Promise<User | IThrowError>>;
    deauthentication: Resolver<null, null, Promise<boolean | IThrowError>>;
  }
  Mutation: {
    defaultAuthentication: Resolver<null, GQL.MutationDefaultAuthenticationArgs, Promise<User | IThrowError>>;
    // providerAuthentication: Resolver<null, GQL.MutationProviderAuthenticationArgs, Promise<User | IThrowError>>;
  }
}
