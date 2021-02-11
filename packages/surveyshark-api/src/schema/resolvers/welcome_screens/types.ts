// Libraries
import { WelcomeScreen, GraphVertex } from '@atomly/surveyshark-collections-lib';

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
    createWelcomeScreen: Resolver<null, GQL.MutationCreateWelcomeScreenArgs, Promise<GraphVertex | IThrowError>>;
    updateWelcomeScreen: Resolver<null, GQL.MutationUpdateWelcomeScreenArgs, Promise<GraphVertex | null | IThrowError>>;
    deleteWelcomeScreen: Resolver<null, GQL.MutationDeleteWelcomeScreenArgs, Promise<GraphVertex | null | IThrowError>>;
  },
}
