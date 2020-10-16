// Dependencies
import { composeResolvers } from '../../utils';

// Resolvers
import answersResolvers, { IAnswersResolverMap } from './answers';
import closuresResolvers, { IClosuresResolverMap } from './closures';
import enumsResolvers, { IEnumsResolverMap } from './enums';
import graphsResolvers, { IGraphsResolverMap } from './graphs';
import queryResolvers, { IQueryResolverMap } from './query';
import questionsResolvers, { IQuestionsResolverMap } from './questions';
import subscriptionResolvers, { ISubscriptionResolverMap } from './subscription';
import surveyResolvers, { ISurveysResolverMap } from './survey';
import usersResolvers, { IUsersResolverMap } from './users';
import welcomeScreensResolvers, { IWelcomeScreensResolverMap } from './welcome_screens';

export type IResolverMap = (
  IAnswersResolverMap &
  IClosuresResolverMap &
  IEnumsResolverMap &
  IGraphsResolverMap &
  IQueryResolverMap &
  IQuestionsResolverMap &
  ISubscriptionResolverMap &
  ISurveysResolverMap &
  IUsersResolverMap &
  IWelcomeScreensResolverMap
);

export const resolvers: IResolverMap = composeResolvers<IResolverMap>(
  answersResolvers,
  closuresResolvers,
  enumsResolvers,
  graphsResolvers,
  queryResolvers,
  questionsResolvers,
  subscriptionResolvers,
  surveyResolvers,
  usersResolvers,
  welcomeScreensResolvers,
);
