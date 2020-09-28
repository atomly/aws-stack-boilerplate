// Libraries
import faker from 'faker';

// Dependencies
import {
  UserDocument,
  SurveyDocument,
  SurveyStatuses,
} from '../../src';
import { dbContext } from '../contants';
import {
  generateSurveyDocument,
  generateUserDocument,
  createSimpleSurveyGraph,
  generateResultDocument,
} from '../fixtures';
import { dropDatabase } from '../utils';

// Types
import { SimpleSurveyData } from '../types';

//
// FIXTURES
//

const simpleSurveyData: SimpleSurveyData = [
  // Welcome Screen:
  {
    welcomeScreen: {
      displayText: 'Welcome!',
      value: faker.random.words(),
    },
  },
  // First question and its answers:
  {
    question: {
      displayText: 'Foo.A',
      value: faker.random.words(),
    },
    answers: [
      {
        displayText: '1.A',
        value: faker.random.words(),
      },
      {
        displayText: '2.A',
        value: faker.random.words(),
      },
      {
        displayText: '3.A',
        value: faker.random.words(),
      },
    ],
  },
  // Second question and its answers:
  {
    question: {
      displayText: 'Foo.E',
      value: faker.random.words(),
    },
    answers: [
      {
        displayText: '1.E',
        value: faker.random.words(),
      },
      {
        displayText: '2.E',
        value: faker.random.words(),
      },
      {
        displayText: '3.E',
        value: faker.random.words(),
      },
    ],
  },
  // Closure:
  {
    closure: {
      displayText: 'Bar',
      value: faker.random.words(),
    },
  },
];

const amountOfQuestions = simpleSurveyData.reduce((acc, data) => data.question ? 1 + acc : acc, 0);
const amountOfAnswers = simpleSurveyData.reduce((acc, data) => data.answers ? data.answers!.length + acc : acc, 0);
const amountOfClosures = simpleSurveyData.reduce((acc, data) => data.closure ? 1 + acc : acc, 0);
const amountOfWelcomeScreens = simpleSurveyData.reduce((acc, data) => data.welcomeScreen ? 1 + acc : acc, 0);
const amountOfVertices = amountOfQuestions + amountOfAnswers + amountOfClosures + amountOfWelcomeScreens;
const amountOfEdges = amountOfAnswers * 2;

let user: UserDocument;
let survey: SurveyDocument;

describe('survey graphs collection works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
      user = await new dbContext.collections.Users.model(generateUserDocument()).save();
    },
    120000,
  );

  afterAll(
    async () => {
      await dropDatabase(dbContext);
      await dbContext.close();
    },
    120000,
  );

  it('successfully creates a document for the survey graphs collection', async () => {
    const doc = generateSurveyDocument(user);
    survey = await new dbContext.collections.Surveys.model(doc).save();
    expect(survey).toBeTruthy();
    expect(survey.uuid).toBeTruthy();
    expect(survey.status).toBe(SurveyStatuses.UNPUBLISHED);
    expect(survey.user).toMatchObject(user);
    expect(survey.createdAt).toBeTruthy();
    expect(survey.updatedAt).toBeTruthy();
    expect(survey.graph).toBeTruthy();
    expect(survey.startingVertex).toBeFalsy();
    expect(survey.closingVertex).toBeFalsy();
  });

  describe('simple graph integration tests including starting question and closure vertices', () => {
    beforeAll(
      async () => {
        survey = await createSimpleSurveyGraph(dbContext, survey, simpleSurveyData);
      },
      120000,
    );

    it('successfully updates the referenced graph', async () => {
      expect(survey).toBeTruthy();
      expect(survey.graph.vertices).toHaveLength(amountOfVertices);
      expect(survey.graph.edges).toHaveLength(amountOfEdges);
    });

    it('successfully updates the survey startingVertex and closingVertex', async () => {
      expect(survey.startingVertex).toBeTruthy();
      expect(survey.closingVertex).toBeTruthy();
    });

    it('successfully created the survey questions, answers, and closures', async () => {
      const amountOfQuestionDocs = await dbContext.collections.Questions.model.countDocuments({ surveyId: survey.uuid });
      expect(amountOfQuestionDocs).toBe(amountOfQuestions);
      const amountOfAnswerDocs = await dbContext.collections.Answers.model.find({ surveyId: survey.uuid });
      expect(amountOfAnswerDocs).toHaveLength(amountOfAnswers);
      const amountofClosureDocs = await dbContext.collections.Closures.model.find({ surveyId: survey.uuid });
      expect(amountofClosureDocs).toHaveLength(amountOfClosures);
      const amountOfWelcomeScreenDocs = await dbContext.collections.WelcomeScreens.model.find({ surveyId: survey.uuid });
      expect(amountOfWelcomeScreenDocs).toHaveLength(amountOfWelcomeScreens);
    });

    it('successfully created the survey vertices respective to the questions, answers, and closures', async () => {
      const amountOfVerticesDocs = await dbContext.collections.GraphVertices.model.countDocuments({ graphId: survey.graph.uuid });
      expect(amountOfVerticesDocs).toBe(amountOfVertices);
    });

    it('successfully created the survey edges respective to the questions, answers, and closures', async () => {
      const amountOfEdgeDocs = await dbContext.collections.GraphEdges.model.countDocuments({ graphId: survey.graph.uuid });
      expect(amountOfEdgeDocs).toBe(amountOfEdges);
    });
  });

  describe('survey delete hooks', () => {
    beforeEach(async () => {
      await survey?.deleteOne();
      survey = await new dbContext.collections.Surveys.model(generateSurveyDocument(user)).save();
      survey = await createSimpleSurveyGraph(dbContext, survey, simpleSurveyData);
      await new dbContext.collections.Results.model(generateResultDocument(survey, faker.internet.email())).save();
    });

    it('should deletes all of the related graph, closure, question, and answer documents when deleting the survey (through document)', async () => {
      await survey.deleteOne();
      const surveyDocCount = await dbContext.collections.Surveys.model.countDocuments({ uuid: survey.uuid });
      expect(surveyDocCount).toBe(0);
      const graphDocCount = await dbContext.collections.Graphs.model.countDocuments({ uuid: survey.graph.uuid });
      expect(graphDocCount).toBe(0);
      const graphVertexDocsCount = await dbContext.collections.GraphVertices.model.countDocuments({ graphId: survey.graph.uuid });
      expect(graphVertexDocsCount).toBe(0);
      const graphEdgeDocsCount = await dbContext.collections.GraphEdges.model.countDocuments({ graphId: survey.graph.uuid });
      expect(graphEdgeDocsCount).toBe(0);
      const questionDocsCount = await dbContext.collections.Questions.model.countDocuments({ surveyId: survey.uuid });
      expect(questionDocsCount).toBe(0);
      const answerDocsCount = await dbContext.collections.Answers.model.countDocuments({ surveyId: survey.uuid });
      expect(answerDocsCount).toBe(0);
      const resultsDocsCount = await dbContext.collections.Results.model.countDocuments({ surveyId: survey.uuid });
      expect(resultsDocsCount).toBe(0);
      const closuresDocsCount = await dbContext.collections.Closures.model.countDocuments({ surveyId: survey.uuid });
      expect(closuresDocsCount).toBe(0);
      const welcomeScreensDocCount = await dbContext.collections.WelcomeScreens.model.countDocuments({ surveyId: survey.uuid });
      expect(welcomeScreensDocCount).toBe(0);
    });
  
    it('should deletes all of the related graph, closure, question, and answer documents when deleting the survey (through query)', async () => {
      await dbContext.collections.Surveys.model.deleteOne({ uuid: survey.uuid });
      const surveyDocCount = await dbContext.collections.Surveys.model.countDocuments({ uuid: survey.uuid });
      expect(surveyDocCount).toBe(0);
      const graphDocCount = await dbContext.collections.Graphs.model.countDocuments({ uuid: survey.graph.uuid });
      expect(graphDocCount).toBe(0);
      const graphVertexDocsCount = await dbContext.collections.GraphVertices.model.countDocuments({ graphId: survey.graph.uuid });
      expect(graphVertexDocsCount).toBe(0);
      const graphEdgeDocsCount = await dbContext.collections.GraphEdges.model.countDocuments({ graphId: survey.graph.uuid });
      expect(graphEdgeDocsCount).toBe(0);
      const questionDocsCount = await dbContext.collections.Questions.model.countDocuments({ surveyId: survey.uuid });
      expect(questionDocsCount).toBe(0);
      const answerDocsCount = await dbContext.collections.Answers.model.countDocuments({ surveyId: survey.uuid });
      expect(answerDocsCount).toBe(0);
      const resultsDocsCount = await dbContext.collections.Results.model.countDocuments({ surveyId: survey.uuid });
      expect(resultsDocsCount).toBe(0);
      const closuresDocsCount = await dbContext.collections.Closures.model.countDocuments({ surveyId: survey.uuid });
      expect(closuresDocsCount).toBe(0);
      const welcomeScreensDocCount = await dbContext.collections.WelcomeScreens.model.countDocuments({ surveyId: survey.uuid });
      expect(welcomeScreensDocCount).toBe(0);
    });
  });

  // TODO: Complex graph integration tests including starting question and closure vertices
});
