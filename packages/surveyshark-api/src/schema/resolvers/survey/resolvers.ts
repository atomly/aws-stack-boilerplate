// Libraries
import { Survey, User, SurveyDocument, Question, Answer, Closure, SurveyTypes } from '@atomly/surveyshark-collections-sdk';

// Types
import { ISurveysResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

// Dependencies
import { surveysWithDataPopulatePipeline } from './aggregations';

const resolvers: ISurveysResolverMap = {
  GraphVertexValue: {
    __resolveType(object: Question | Answer | Closure): 'Question' | 'Answer' | 'Closure' | null {
      switch(object.type) {
        case SurveyTypes.QUESTION:
          return 'Question';
        case SurveyTypes.ANSWER:
          return 'Answer';
        case SurveyTypes.CLOSURE:
          return 'Closure';
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
          name: input.name,
          description: input.description,
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
