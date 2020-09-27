// Libraries
import { Answer } from '@atomly/surveyshark-collections-sdk';

// Types
import { IAnswersResolverMap } from './types';
import { IThrowError } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

const resolvers: IAnswersResolverMap = {
  Query: {
    async readAnswer(_, { input }, { dbContext }): Promise<Answer | null> {
      const answer = await dbContext.collections.Answers.model.findOne({
        uuid: input.uuid,
      }).lean<Answer>();
      return answer;
    },
    async readAnswers(_, { input }, { dbContext }): Promise<Answer[]> {
      const answers = await dbContext.collections.Answers.model.find({
        surveyId: input.surveyId,
        parentQuestionId: input.parentQuestionId,
      }).lean();
      return answers;
    },
  },
  Mutation: {
    async createAnswer(_, { input }, { dbContext }): Promise<Answer | IThrowError> {
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
        const answer = await new dbContext.collections.Answers.model(input).save();
        const answerVertex = await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: answer.uuid,
          value: answer,
          _valueCollectionName: dbContext.collections.Answers.collectionName,
        }).save();
        const parentGraphVertex = await dbContext.collections.GraphVertices.model.findOne({
          key: input.parentQuestionId,
        });
        await new dbContext.collections.GraphEdges.model({
          graphId: survey.graph.uuid,
          from: parentGraphVertex,
          to: answerVertex,
        }).save();
        return answer;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateAnswer(_, { input }, { dbContext }): Promise<Answer | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateAnswerInput, 'uuid'>> = {};
        const answer = await dbContext.collections.Answers.model.updateOne(
          { uuid: input.uuid },
          input,
        ).lean() as Answer | null;
        return answer;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteAnswer(_, { input }, { dbContext }): Promise<Answer | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateAnswerInput, 'uuid'>> = {};
        const answer = await dbContext.collections.Answers.model.deleteOne({ uuid: input.uuid }).lean() as Answer | null;
        return answer;
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
