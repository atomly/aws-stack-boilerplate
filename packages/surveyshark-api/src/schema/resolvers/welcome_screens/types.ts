// Libraries
import { WelcomeScreen } from '@atomly/surveyshark-collections-lib';

// Dependencies
import { IThrowError } from '../../../utils';

// Types
import {
  GQL,
  Resolver,
  IResolvers,
} from '../../../types';

export interface IWelcomeScreensResolverMap extends IResolvers {
  Query: {
    readWelcomeScreen: Resolver<null, GQL.QueryReadWelcomeScreenArgs, Promise<WelcomeScreen | null>>;
    readWelcomeScreens: Resolver<null, GQL.QueryReadWelcomeScreensArgs, Promise<WelcomeScreen[]>>;
  },
  Mutation: {
    createWelcomeScreen: Resolver<null, GQL.MutationCreateWelcomeScreenArgs, Promise<WelcomeScreen | IThrowError>>;
    updateWelcomeScreen: Resolver<null, GQL.MutationUpdateWelcomeScreenArgs, Promise<WelcomeScreen | null | IThrowError>>;
    deleteWelcomeScreen: Resolver<null, GQL.MutationDeleteWelcomeScreenArgs, Promise<WelcomeScreen | null | IThrowError>>;
  },
}
