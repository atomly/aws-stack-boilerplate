// Libraries
import faker from 'faker';

// Types
import { Document } from 'mongoose';
import {
  AnswerDocument,
  ClosureDocument,
  GraphDocument,
  GraphEdgeDocument,
  GraphVertexDocument,
  QuestionDocument,
  SurveyDocument,
  UserDocument,
  SurveyTypes,
  QuestionTypes,
  TemplateDBContext,
  ResultDocument,
  WelcomeScreenDocument,
} from '@atomly/template-collections-lib';
import { SimpleSurveyData } from './types';

export function generateAnswerDocument<T = string>(
  surveyId: string = faker.random.uuid(),
  parentQuestionId: string = faker.random.uuid(),
  name: string = faker.random.word(),
  data: T = faker.random.words() as unknown as T,
  ): Partial<AnswerDocument<T>> {
  return {
    surveyId,
    parentQuestionId,
    type: SurveyTypes.ANSWER,
    subType: QuestionTypes.MULTI_CHOICES,
    name,
    data,
  };
}

export function generateClosureDocument(
  surveyId: string = faker.random.uuid(),
  name: string = faker.random.word(),
  description?: string,
  ): Partial<ClosureDocument> {
  return {
    surveyId,
    type: SurveyTypes.CLOSURE,
    name,
    description,
  };
}

export function generateWelcomeScreenDocument(
  surveyId: string = faker.random.uuid(),
  name: string = faker.random.word(),
  description?: string,
  ): Partial<WelcomeScreenDocument> {
  return {
    surveyId,
    type: SurveyTypes.WELCOME_SCREEN,
    name,
    description,
  };
}

export function generateGraphDocument(): Partial<GraphDocument> {
  return {
    vertices: [],
    edges: [],
  };
}

export function generateGraphEdgeDocument(
  graphId: string,
  from: GraphVertexDocument,
  to: GraphVertexDocument,
): Partial<GraphEdgeDocument> {
  return {
    graphId,
    from,
    to,
    weight: faker.random.number(),
  };
}

export function generateGraphVertexDocument<T extends Document>(
  graphId: string,
  value?: T,
): Partial<GraphVertexDocument<T>> {
  return {
    key: faker.random.uuid(),
    graphId,
    value,
    _valueCollectionName: value ? value.collection.name : undefined,
  };
}

export function generateQuestionDocument<T = string>(
  surveyId: string = faker.random.uuid(),
  name: string = faker.random.word(),
  data: T = faker.random.words() as unknown as T,
  description?: string,
  ): Partial<QuestionDocument> {
  return {
    surveyId,
    type: SurveyTypes.QUESTION,
    subType: QuestionTypes.MULTI_CHOICES,
    name,
    data,
    description,
  };
}

export function generateResultDocument(
  survey: SurveyDocument,
  identifier: string = faker.internet.email(),
): Partial<ResultDocument> {
  const questionVertices = (survey.graph.vertices as GraphVertexDocument<QuestionDocument>[]).filter(vertex => {
    return vertex.value?.type === SurveyTypes.QUESTION;
  });
  const data: ResultDocument['data'] = questionVertices.map(questionVertex => {
    const answerVertices = survey.graph.edges.reduce(
      (acc, edge) => {
        if (edge.from.uuid === questionVertex.uuid) {
          const answer = survey.graph.vertices.find((
            vertex => vertex._id.toString() === edge.to._id.toString()
          )) as GraphVertexDocument<AnswerDocument>;
          acc.push(answer);
        }
        return acc;
      },
      [] as GraphVertexDocument<AnswerDocument>[],
    );
    const randomAnswerIndex = faker.random.number(answerVertices.length - 1);
    const randomAnswer = answerVertices[randomAnswerIndex].value!;
    return {
      question: questionVertex.value!,
      answer: {
        answerId: randomAnswer.id,
        name: randomAnswer.name,
      },
    }
  });
  return {
    surveyId: survey.uuid,
    data,
    identifier,
  };
}

export function generateSurveyDocument(user: UserDocument): Partial<SurveyDocument> {
  return {
    user,
    name: faker.random.words(),
    description: `${faker.random.words()}, ${faker.random.words()}.`,
    // startingVertex: GraphVertexDocument;
    // surveyStartingQuestion: GraphVertexDocument;
    // surveyClosure: GraphVertexDocument;
    // graph: GraphDocument;
  };
}

export function generateUserDocument(): Partial<UserDocument> {
  return {
    provider: faker.random.word(),
    providerId: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    displayName: faker.internet.userName(),
    email: faker.internet.email(),
    password: null,
  };
}

/**
 * Creates a simple, "linear" survey document's graph where the answers simply point to the next
 * question or closure.
 * @param surveyData - Survey data fixtures.
 */
export async function createSimpleSurveyGraph(
  dbContext: TemplateDBContext,
  survey: SurveyDocument,
  surveyData: SimpleSurveyData,
): Promise<SurveyDocument> {
  let firstVertex: GraphVertexDocument | undefined;
  let closureVertex: GraphVertexDocument;
  let previousAnswersVertices: GraphVertexDocument[] = [];
  for await (const data of surveyData) {
    let currentMainVertex: GraphVertexDocument;
    let currentAnswerVertices: GraphVertexDocument[] = [];
    if (data.closure) {
      const closure = await new dbContext.collections.Closures.model(generateClosureDocument(
        survey.uuid,
        data.closure.name,
      )).save();
      currentMainVertex = await new dbContext.collections.GraphVertices
        .model(generateGraphVertexDocument(
          survey.graph.uuid,
          closure,
        ))
        .save();
      closureVertex = currentMainVertex;
    } else if (data.welcomeScreen) {
      const welcomeScreen = await new dbContext.collections.WelcomeScreens.model(generateWelcomeScreenDocument(
        survey.uuid,
        data.welcomeScreen.name,
      )).save();
      currentMainVertex = await new dbContext.collections.GraphVertices
        .model(generateGraphVertexDocument(
          survey.graph.uuid,
          welcomeScreen,
        ))
        .save();
        firstVertex = currentMainVertex;
    } else {
      const question = await new dbContext.collections.Questions.model(generateQuestionDocument(
        survey.uuid,
        data.question.name,
        data.question.value,
      )).save();
      currentMainVertex = await new dbContext.collections.GraphVertices
        .model(generateGraphVertexDocument(
          survey.graph.uuid,
          question,
        ))
        .save();
      // Create the current question's answers and their respective vertices:
      const answersData = data.answers.map(answer => generateAnswerDocument(survey.uuid, question.uuid, answer.name, answer.value))
      const answers = await dbContext.collections.Answers
        .model
        .insertMany(answersData);
      currentAnswerVertices = await dbContext.collections.GraphVertices
        .model
        .insertMany(answers.map(answer => generateGraphVertexDocument(
          survey.graph.uuid,
          answer,
        )));
      // Connect the current question's vertex to its answers' vertices:
      await dbContext.collections.GraphEdges
        .model
        .insertMany(currentAnswerVertices.map(currentAnswerVertex => generateGraphEdgeDocument(
          survey.graph.uuid,
          currentMainVertex,
          currentAnswerVertex,
        )));
    }
    // If there are any previous answer vertices, connect them to the new question:
    if (previousAnswersVertices.length) {
      await dbContext.collections.GraphEdges
        .model
        .insertMany(previousAnswersVertices.map(previousAnswersVertex => generateGraphEdgeDocument(
          survey.graph.uuid,
          previousAnswersVertex,
          currentMainVertex,
        )));
    }
    // Saving the first question vertex:
    if (!firstVertex) { firstVertex = currentMainVertex; }
    // Saving the current answers for the next loop:
    previousAnswersVertices = currentAnswerVertices;
  }
  await dbContext.collections.Surveys.model.findOneAndUpdate(
    { uuid: survey.uuid },
    {
      startingVertex: firstVertex as GraphVertexDocument<QuestionDocument>,
      closingVertex: closureVertex! as GraphVertexDocument<ClosureDocument>,
    },
  );
  const updatedSurvey = await dbContext.collections.Surveys.model
    .findOne({ uuid: survey.uuid })
    .populate([
      {
        path: 'startingVertex',
        populate: 'value',
      },
      {
        path: 'closingVertex',
        populate: 'value',
      },
      {
        path: 'graph',
        populate: [
          {
            path: 'vertices',
            populate: 'value',
          },
          {
            path: 'edges',
            populate: ['from', 'to'],
          },
        ],
      },
    ]) as SurveyDocument;
  return updatedSurvey;
}
