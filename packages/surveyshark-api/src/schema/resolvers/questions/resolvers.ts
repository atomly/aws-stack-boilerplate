// Libraries
import { Question, SurveyTypes } from '@atomly/surveyshark-collections-sdk';

// Types
import { IQuestionsResolverMap } from './types';
import { IThrowError, safeJsonParse } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

// Dependencies
import { questionsWithAnswersPipeline, questionWithAnswersPipeline } from './aggregations';

const resolvers: IQuestionsResolverMap = {
  Question: {
    data(parent): SurveyTypes {
      return safeJsonParse(parent.data).value || parent.data;
    },
  },
  Query: {
    async readQuestion(_, { input, withAnswers }, { dbContext }): Promise<Question | null> {
      if (withAnswers) {
        const questions = await dbContext.collections.Questions.model.aggregate<Question>(questionsWithAnswersPipeline(input.uuid));
        return questions[0];
      } else {
        const question = await dbContext.collections.Questions.model.findOne({
          uuid: input.uuid,
        }).lean<Question>();
        return question;
      }
    },
    async readQuestions(_, { input, withAnswers }, { dbContext }): Promise<Question[]> {
      if (withAnswers) {
        const questions = await dbContext.collections.Questions.model.aggregate<Question>(questionWithAnswersPipeline);
        return questions;
      } else {
        const questions = await dbContext.collections.Questions.model.find({
          surveyId: input.surveyId,
        }).lean();
        return questions;
      }
    },
  },
  Mutation: {
    async createQuestion(_, { input }, { dbContext }): Promise<Question | IThrowError> {
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
        const question = await new dbContext.collections.Questions.model(input).save();
        await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: question.uuid,
          value: question,
          _valueCollectionName: dbContext.collections.Questions.collectionName,
        }).save();
        return question;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateQuestion(_, { input }, { dbContext }): Promise<Question | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateQuestionInput, 'uuid'>> = {};
        const question = await dbContext.collections.Questions.model.updateOne(
          { uuid: input.uuid },
          input,
        ).lean() as Question | null;
        return question;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteQuestion(_, { input }, { dbContext }): Promise<Question | null | IThrowError> {
      try {
        // const changes: Partial<Omit<GQL.MutationUpdateQuestionInput, 'uuid'>> = {};
        const question = await dbContext.collections.Questions.model.deleteOne({ uuid: input.uuid }).lean() as Question | null;
        return question;
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
