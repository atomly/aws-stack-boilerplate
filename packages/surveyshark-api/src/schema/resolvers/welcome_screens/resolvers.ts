// Libraries
import { WelcomeScreen } from '@atomly/surveyshark-collections-sdk';

// Types
import { IWelcomeScreensResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

const resolvers: IWelcomeScreensResolverMap = {
  Query: {
    async readWelcomeScreen(_, { input }, { dbContext }): Promise<WelcomeScreen | null> {
      const welcomeScreen = await dbContext.collections.WelcomeScreens.model.findOne({
        uuid: input.uuid,
      }).lean<WelcomeScreen>();
      return welcomeScreen;
    },
    async readWelcomeScreens(_, { input }, { dbContext }): Promise<WelcomeScreen[]> {
      const welcomeScreens = await dbContext.collections.WelcomeScreens.model.find({
        surveyId: input.surveyId,
      }).lean();
      return welcomeScreens;
    },
  },
  Mutation: {
    async createWelcomeScreen(_, { input }, { dbContext }): Promise<WelcomeScreen | IThrowError> {
      try {
        // TODO: Add transaction
        const survey = await dbContext.collections.Surveys.model.findOne({
          uuid: input.surveyId,
        }).populate('graph').lean();
        if (!survey) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Invalid survey ID ${input.surveyId} input.`,
          });
        }
        const welcomeScreen = await new dbContext.collections.WelcomeScreens.model(input).save();
        await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: welcomeScreen.uuid,
          value: welcomeScreen,
          _valueCollectionName: dbContext.collections.WelcomeScreens.collectionName,
        }).save();
        return welcomeScreen;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateWelcomeScreen(_, { input }, { dbContext }): Promise<WelcomeScreen | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateWelcomeScreenInput, 'uuid'>> = {};
        const welcomeScreen = await dbContext.collections.WelcomeScreens.model.updateOne(
          { uuid: input.uuid },
          input,
        ).lean() as WelcomeScreen | null;
        return welcomeScreen;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteWelcomeScreen(_, { input }, { dbContext }): Promise<WelcomeScreen | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateWelcomeScreenInput, 'uuid'>> = {};
        const welcomeScreen = await dbContext.collections.WelcomeScreens.model.deleteOne({ uuid: input.uuid }).lean() as WelcomeScreen | null;
        return welcomeScreen;
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
