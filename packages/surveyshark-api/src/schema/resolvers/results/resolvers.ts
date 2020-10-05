// Libraries
import { Result, SurveyTypes, Question, ResultDocument, SurveyStatuses } from '@atomly/surveyshark-collections-lib';

// Types
import { IResultsResolverMap } from './types';
import { IThrowError, safeJsonParse } from '../../../utils';

// Utils
import { throwError } from '../../../utils';
import { surveysWithDataPopulatePipeline } from '../survey/aggregations';

const resolvers: IResultsResolverMap = {
  ResultData: {
    answer(parent): Result['data'][number]['answer'] {
      return safeJsonParse(parent.data).value || parent.data;
    },
  },
  Query: {
    async readResult(_, { input }, { dbContext }): Promise<Result | null> {
      const result = await dbContext.collections.Results.model.findOne({
        uuid: input.uuid,
      }).lean<Result>();
      return result;
    },
    async readResults(_, { input }, { dbContext }): Promise<Result[]> {
      const results = await dbContext.collections.Results.model.find({ surveyId: input.surveyId }).lean();
      return results;
    },
  },
  Mutation: {
    async createResult(_, { input }, { dbContext }): Promise<Result | IThrowError> {
      try {
        const survey = await dbContext.collections.Surveys.model.findOne({
          uuid: input.surveyId,
          status: SurveyStatuses.PUBLISHED,
        }).populate(surveysWithDataPopulatePipeline).lean();
        if (!survey) {
          return throwError({
            status: throwError.Errors.EStatuses.BAD_REQUEST,
            message: `Invalid survey ID ${input.surveyId} input. Survey might not have status ${SurveyStatuses.PUBLISHED}.`,
          });
        }
        const questionsMap = survey.graph.vertices.reduce(
          (acc, vertex) => {
            if (vertex.value?.type === SurveyTypes.QUESTION) {
              acc[vertex.value.uuid] = vertex.value;
            }
            return acc;
          },
          {} as Record<string, Question>,
        );
        const resultData: Result['data'] = input.data.map(d => {
          const question = questionsMap[d.questionId];
          if (!question) {
            throw new Error(`Invalid question ID data ${d.questionId} input.`);
          }
          return {
            question,
            answer: d.answer,
          };
        })
        const result = await new dbContext.collections.Results.model({
          surveyId: survey.uuid,
          data: resultData,
          identifier: input.identifier ?? undefined,
        }).save();
        return result;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateResult(_, { input }, { dbContext }): Promise<Result | null | IThrowError> {
      try {
        const result = await dbContext.collections.Results.model.findOneAndUpdate(
          { uuid: input.uuid },
          input as Partial<ResultDocument>,
          { new: true },
        ).lean() as Result | null;
        return result;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteResult(_, { input }, { dbContext }): Promise<Result | null | IThrowError> {
      try {
        const result: Result | null = await dbContext.collections.Results.model.findOneAndDelete({ uuid: input.uuid }).lean<Result>();
        return result;
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
