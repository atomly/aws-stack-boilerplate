// Libraries
import { Question, QuestionTypes, GraphVertexDocument, GraphVertex } from '@atomly/surveyshark-collections-lib';

// Types
import { IQuestionsResolverMap } from './types';
import { IThrowError, safeJsonParse } from '../../../utils';

// Utils
import { throwError } from '../../../utils';

// Dependencies
import { questionsWithAnswersPipeline, questionWithAnswersPipeline } from './aggregations';
import { Answer } from 'surveyshark-api/src/types/schema';

const resolvers: IQuestionsResolverMap = {
  Question: {
    data(parent): Question['data'] {
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
    async createQuestion(_, { input }, { dbContext }): Promise<GraphVertex | IThrowError> {
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

        const questionGraphVertex = await new dbContext.collections.GraphVertices.model({
          graphId: survey.graph.uuid,
          key: question.uuid,
          value: question,
          _valueCollectionName: dbContext.collections.Questions.collectionName,
        }).save();

        return questionGraphVertex;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async updateQuestion(_, { input }, { dbContext }): Promise<GraphVertex | null | IThrowError> {
      try {
        let questionGraphVertex: GraphVertexDocument | null = null;

        const session = await dbContext.connection!.startSession();

        /**
         * When the subtype of the question changes, also update its answers.
         * If the subtype changes from SINGLE_CHOICE to MULTI_CHOICES, simply update the
         * answers subtype and reset the `data` object.
         * Otherwise, delete the answers, their graph vertices, and edges, essentially resetting the question.
         */
        await session.withTransaction(async () => {
          const question = await dbContext.collections.Questions.model.findOneAndUpdate(
            { uuid: input.uuid },
            input as Partial<Question>,
            { new: true },
          ).lean() as Question | null;

          questionGraphVertex = await dbContext.collections.GraphVertices.model.findOne({ key: input.uuid }).lean<GraphVertexDocument>();

          if (question && input.subType) {
            const subType = input.subType as unknown as QuestionTypes;

            switch(subType) {
              case QuestionTypes.SINGLE_CHOICE:
              case QuestionTypes.MULTI_CHOICES:
                await dbContext.collections.Answers.model.updateMany(
                  { parentQuestionId: question.uuid },
                  { subType, data: {} },
                );

                break;
              default: {
                if (questionGraphVertex) {
                  const graphEdgesQuery = {
                    from: questionGraphVertex,
                  };

                  const graphEdges = await dbContext.collections.GraphEdges.model.find(graphEdgesQuery);

                  await Promise.all([
                    dbContext.collections.GraphEdges.model.deleteMany(graphEdgesQuery),
                    dbContext.collections.GraphVertices.model.deleteMany({
                      _id: graphEdges.map(graphEdge => graphEdge.to),
                    }),
                    dbContext.collections.Answers.model.deleteMany({
                      surveyId: question.surveyId,
                      parentQuestionId: question.uuid,
                    }),
                  ]);
                }

                break;
              }
            }
          }
        });

        await session.commitTransaction();

        session.endSession();

        return questionGraphVertex;
      } catch (err) {
        return throwError({
          status: throwError.Errors.EStatuses.BAD_REQUEST,
          message: 'Invalid input.',
          details: err.message,
        });
      }
    },
    async deleteQuestion(_, { input }, { dbContext }): Promise<GraphVertex | null | IThrowError> {
      try {
        const questionGraphVertex: GraphVertex | null = await dbContext.collections.GraphVertices.model.findOne({ key: input.uuid }).lean();

        let question: Question | null = null;

        const session = await dbContext.connection!.startSession();

        await session.withTransaction(async () => {
          const questions = await dbContext.collections.Questions.model.aggregate<Question>(questionsWithAnswersPipeline(input.uuid));

          question = questions[0];

          if (question) {
            const graphVerticesKeys = [question.uuid];

            (question as Question & { answers: Answer[] }).answers.forEach(a => {
              graphVerticesKeys.push(a.uuid);
            });

            await Promise.all([
              dbContext.collections.GraphVertices.model.deleteMany({ key: { $in: graphVerticesKeys } }),
              dbContext.collections.Questions.model.deleteOne({ uuid: question.uuid }),
            ]);
          }
        });

        await session.commitTransaction();

        session.endSession();

        return questionGraphVertex;
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
