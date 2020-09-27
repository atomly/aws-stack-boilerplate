// Dependencies
import { composeResolvers } from '../../utils';

// Resolvers
import answersResolvers, { IAnswersResolverMap } from './answers';
import closuresResolvers, { IClosuresResolverMap } from './closures';
import enumsResolvers, { IEnumsResolverMap } from './enums';
import queryResolvers, { IQueryResolverMap } from './query';
import questionsResolvers, { IQuestionsResolverMap } from './questions';
import surveyResolvers, { ISurveysResolverMap } from './survey';
import usersResolvers, { IUsersResolverMap } from './users';

export type IResolverMap = (
  IAnswersResolverMap &
  IClosuresResolverMap &
  IEnumsResolverMap &
  IQueryResolverMap &
  IQuestionsResolverMap &
  ISurveysResolverMap &
  IUsersResolverMap
);

export const resolvers: IResolverMap = composeResolvers<IResolverMap>(
  answersResolvers,
  closuresResolvers,
  enumsResolvers,
  queryResolvers,
  questionsResolvers,
  surveyResolvers,
  usersResolvers,
);
