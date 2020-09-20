// Libraries
// import { Users } from '@atomly/atomly-entities';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

// User resolvers
type TQueryUser = Resolver<null, GQL.QueryUserArgs, Promise<Users | undefined>>
type TQueryUsers = Resolver<null, null, Promise<Users[]>>
type TQueryMe = Resolver<null, null, Promise<Users | undefined>>

type TMutationNewUser= Resolver<null, GQL.MutationNewUserArgs, Promise<Users | IThrowError>>
type TMutationAuthenticate = Resolver<null, GQL.MutationAuthenticateArgs, Promise<Users | undefined | IThrowError>>
type TMutationLogout = Resolver<null, null, Promise<boolean | IThrowError>>

export interface IUsersResolverMap extends IResolvers {
  Query: {
    user: TQueryUser
    users: TQueryUsers
    me: TQueryMe
  }
  Mutation: {
    newUser: TMutationNewUser
    authenticate: TMutationAuthenticate
    logout: TMutationLogout
  }
}
