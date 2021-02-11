// Libraries
import { WelcomeScreen, GraphVertex } from '@atomly/surveyshark-collections-lib';

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
    async createWelcomeScreen(_, { input }, { dbContext }): Promise<GraphVertex | IThrowError> {
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

        const welcomeScreenGraphVertex = await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: welcomeScreen.uuid,
          value: welcomeScreen,
          _valueCollectionName: dbContext.collections.WelcomeScreens.collectionName,
        }).save();

        return welcomeScreenGraphVertex;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateWelcomeScreen(_, { input }, { dbContext }): Promise<GraphVertex | null | IThrowError> {
      try {
        await dbContext.collections.WelcomeScreens.model.updateOne(
          { uuid: input.uuid },
          input as Partial<WelcomeScreen>,
        ).lean() as WelcomeScreen | null;

        const welcomeScreenGraphVertex = await dbContext.collections.GraphVertices.model.findOne({ key: input.uuid }).lean();

        return welcomeScreenGraphVertex;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteWelcomeScreen(_, { input }, { dbContext }): Promise<GraphVertex | null | IThrowError> {
      try {
        const welcomeScreenGraphVertex = await dbContext.collections.GraphVertices.model.findOne({ key: input.uuid }).lean();

        let welcomeScreen: WelcomeScreen | null = null;

        const session = await dbContext.connection!.startSession();

        await session.withTransaction(async () => {
          welcomeScreen = await dbContext.collections.WelcomeScreens.model.findOneAndDelete({ uuid: input.uuid }).lean<WelcomeScreen>();

          if (welcomeScreen) {
            await dbContext.collections.GraphVertices.model.deleteOne({ key: welcomeScreen.uuid });
          }
        });

        await session.commitTransaction();

        session.endSession();

        return welcomeScreenGraphVertex;
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
