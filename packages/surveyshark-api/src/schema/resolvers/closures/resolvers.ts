// Libraries
import { Closure } from '@atomly/surveyshark-collections-lib';

// Types
import { IClosuresResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

const resolvers: IClosuresResolverMap = {
  Query: {
    async readClosure(_, { input }, { dbContext }): Promise<Closure | null> {
      const closure = await dbContext.collections.Closures.model.findOne({
        uuid: input.uuid,
      }).lean<Closure>();
      return closure;
    },
    async readClosures(_, { input }, { dbContext }): Promise<Closure[]> {
      const closures = await dbContext.collections.Closures.model.find({
        surveyId: input.surveyId,
      }).lean();
      return closures;
    },
  },
  Mutation: {
    async createClosure(_, { input }, { dbContext }): Promise<Closure | IThrowError> {
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
        const closure = await new dbContext.collections.Closures.model(input).save();
        await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: closure.uuid,
          value: closure,
          _valueCollectionName: dbContext.collections.Closures.collectionName,
        }).save();
        return closure;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateClosure(_, { input }, { dbContext }): Promise<Closure | null | IThrowError> {
      try {
        const closure = await dbContext.collections.Closures.model.findOneAndUpdate(
          { uuid: input.uuid },
          input as Partial<Closure>,
          { new: true },
        ).lean() as Closure | null;
        return closure;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteClosure(_, { input }, { dbContext }): Promise<Closure | null | IThrowError> {
      try {
        let closure: Closure | null = null;
        const session = await dbContext.connection!.startSession();
        await session.withTransaction(async () => {
          closure = await dbContext.collections.Closures.model.findOneAndDelete({ uuid: input.uuid }).lean<Closure>();
          if (closure) {
            await dbContext.collections.GraphVertices.model.deleteOne({ key: closure.uuid });
          }
        });
        await session.commitTransaction();
        session.endSession();
        return closure;
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
