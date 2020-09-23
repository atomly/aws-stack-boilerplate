// Libraries
import { User } from '@atomly/surveyshark-collections-sdk';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

// Enums
export enum AuthenticationProviders {
  GOOGLE = 'google-auth',
}

type TQueryUser = Resolver<null, GQL.QueryUserArgs, Promise<User | null>>;
// type TQueryUsers = Resolver<null, null, Promise<User[]>>;
type TQueryMe = Resolver<null, null, Promise<User | null>>;
// type TQueryDefaultAuthentication = Resolver<null, GQL.QueryDefaultAuthenticationArgs, Promise<User | null>>;
type TQueryProviderAuthentication = Resolver<null, GQL.QueryProviderAuthenticationArgs, Promise<User | IThrowError>>;
type TQueryDeauthentication = Resolver<null, null, Promise<boolean | IThrowError>>;

// type TMutationDefaultAuthentication = Resolver<null, GQL.MutationDefaultAuthenticationArgs, Promise<User | IThrowError>>;
type TMutationProviderAuthentication = Resolver<null, GQL.MutationProviderAuthenticationArgs, Promise<User | IThrowError>>;

export interface IUsersResolverMap extends IResolvers {
  AuthenticationProviders: typeof AuthenticationProviders,
  Query: {
    user: TQueryUser;
    // users: TQueryUsers;
    me: TQueryMe;
    // defaultAuthentication: TQueryDefaultAuthentication;
    providerAuthentication: TQueryProviderAuthentication;
    deauthentication: TQueryDeauthentication;
  }
  Mutation: {
    // defaultAuthentication: TMutationDefaultAuthentication;
    providerAuthentication: TMutationProviderAuthentication;
  }
}
