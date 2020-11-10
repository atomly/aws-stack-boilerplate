// Libraries
import { Survey, User, SurveyDocument, Question, Answer, Closure, SurveyTypes, SurveyStatuses, WelcomeScreen } from '@atomly/surveyshark-collections-lib';

// Types
import { ISurveysResolverMap } from './types';
import { IThrowError } from '../../../utils';
import { GQL } from '../../../types';

// Utils
import { throwError } from '../../../utils';
import { validateSurvey } from './utils';

// Dependencies
import { surveysWithDataPopulatePipeline } from './aggregations';

const resolvers: ISurveysResolverMap = {
  GraphVertexValue: {
    __resolveType(object: Question | Answer | Closure | WelcomeScreen): 'Question' | 'Answer' | 'Closure' | 'WelcomeScreen' | null {
      switch(object.type) {
        case SurveyTypes.QUESTION:
          return 'Question';
        case SurveyTypes.ANSWER:
          return 'Answer';
        case SurveyTypes.CLOSURE:
          return 'Closure';
        case SurveyTypes.WELCOME_SCREEN:
          return 'WelcomeScreen';
        default:
          return null;
      }
    },
  },
  Query: {
    async readSurvey(_, { input }, { dbContext }): Promise<Survey | null> {
      const survey = await dbContext.collections.Surveys.model
        .findOne({
          uuid: input.uuid,
        })
        .populate(surveysWithDataPopulatePipeline)
        .lean<Survey>();
      return survey;
    },
    async readSurveys(_, { withData }, { dbContext, request }): Promise<Survey[] | IThrowError> {
      if (!request.session?.userId) {
        return throwError({
          status: throwError.Errors.EStatuses.UNATHORIZED,
          message: 'Client is unauthenticated.',
        });
      }
      const user = await dbContext.collections.Users.model.findOne({
        uuid: request.session.userId,
      });
      if (!user) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: `User ${request.session.userId} does not exists.`,
        });
      }
      if (withData) {
        const surveys = await dbContext.collections.Surveys.model
          .find({
            user,
          })
          .populate(surveysWithDataPopulatePipeline)
          .lean();
        return surveys;
      } else {
        const surveys = await dbContext.collections.Surveys.model.find({
            user,
        }).lean();
        return surveys;
      }
    },
    async validateSurvey(_, { input }, { dbContext }): Promise<GQL.SurveyValidationError[] | null> {
      const survey = await dbContext.collections.Surveys.model
        .findOne({
          uuid: input.uuid,
          status: SurveyStatuses.UNPUBLISHED,
        })
        .populate(surveysWithDataPopulatePipeline)
        .lean<Survey>();
      if (survey) {
        const unconnectedVertices = validateSurvey(survey);
        return unconnectedVertices.map(vertex => ({
          vertexKey: vertex.key,
          error: 'Vertex has no edges.',
        }));
      }
      return null;
    },
  },
  Mutation: {
    async createSurvey(_, { input }, { dbContext, request }): Promise<Survey | IThrowError> {
      if (!request.session?.userId) {
        return throwError({
          status: throwError.Errors.EStatuses.UNATHORIZED,
          message: 'Client is unauthenticated.',
        });
      }
      try {
        // TODO: Add transaction
        const user = await dbContext.collections.Users.model.findOne({
          uuid: request.session.userId,
        }).lean<User>();
        if (!user) {
          throw new Error(`User ${request.session.userId} does not exists.`);
        }
        const graph = await new dbContext.collections.Graphs.model().save();
        const survey = await new dbContext.collections.Surveys.model({
          ...input,
          user,
          graph,
        }).save();
        await survey.populate('user').execPopulate();
        return survey;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateSurvey(_, { input }, { dbContext }): Promise<Survey | null | IThrowError> {
      try {
        const survey = await dbContext.collections.Surveys.model.findOneAndUpdate(
          { uuid: input.uuid },
          input as Partial<SurveyDocument>,
          { new: true },
        ).lean() as Survey | null;
        return survey;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteSurvey(_, { input }, { dbContext }): Promise<Survey | null | IThrowError> {
      try {
        const survey = await dbContext.collections.Surveys.model.findOneAndDelete({ uuid: input.uuid });
        return survey;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
  },
}

export default resolvers;
