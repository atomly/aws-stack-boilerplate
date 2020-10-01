// Libraries
import { Answer, SurveyTypes } from '@atomly/surveyshark-collections-sdk';

// Types
import { IAnswersResolverMap } from './types';
import { IThrowError, safeJsonParse } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

const resolvers: IAnswersResolverMap = {
  Answer: {
    data(parent): SurveyTypes {
      return safeJsonParse(parent.data).value || parent.data;
    },
  },
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
        const answer = await dbContext.collections.Answers.model.findOneAndUpdate(
          { uuid: input.uuid },
          input as Partial<Answer>,
          { new: true },
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
        let answer: Answer | null = null;
        const session = await dbContext.connection.startSession();
        await session.withTransaction(async () => {
          answer = await dbContext.collections.Answers.model.findOneAndDelete({ uuid: input.uuid }).lean<Answer>();
          if (answer) {
            await dbContext.collections.GraphVertices.model.deleteOne({ key: answer.uuid });
          }
        });
        await session.commitTransaction();
        session.endSession();
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
