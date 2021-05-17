// Libraries
import faker from 'faker';

// Dependencies
import { dbContext } from '../contants';
import { generateUserDocument, generateSurveyDocument, createSimpleSurveyGraph, generateResultDocument } from '../fixtures';
import { dropDatabase } from '../utils';

// Types
import { SimpleSurveyData } from '../types';
import { SurveyDocument, UserDocument } from '../../src';

//
// FIXTURES
//

const simpleSurveyData: SimpleSurveyData = [
  // First question and its answers:
  {
    question: {
      name: 'Foo.A',
      value: faker.random.words(),
    },
    answers: [
      {
        name: '1.A',
        value: faker.random.words(),
      },
      {
        name: '2.A',
        value: faker.random.words(),
      },
      {
        name: '3.A',
        value: faker.random.words(),
      },
    ],
  },
  // Second question and its answers:
  {
    question: {
      name: 'Foo.E',
      value: faker.random.words(),
    },
    answers: [
      {
        name: '1.E',
        value: faker.random.words(),
      },
      {
        name: '2.E',
        value: faker.random.words(),
      },
      {
        name: '3.E',
        value: faker.random.words(),
      },
    ],
  },
  // Closure:
  {
    closure: {
      name: 'Bar',
      value: faker.random.words(),
    },
  },
];

//
// CONSTANTS
//

const TEST_ENTITITIES_AMOUNT = 5;

const randomUsers = new Array(TEST_ENTITITIES_AMOUNT)
  .fill(undefined)
  .map(() => generateUserDocument());

describe('users collection works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
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

  it('successfully creates a document for the users collection', async () => {
    const doc = generateUserDocument();
    const user = await new dbContext.collections.Users.model(doc).save();
    expect(user).toBeTruthy();
    expect(user.uuid).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
    expect(user.updatedAt).toBeTruthy();
    expect(user.provider).toBe(doc.provider);
    expect(user.providerId).toBe(doc.providerId);
    expect(user.firstName).toBe(doc.firstName);
    expect(user.lastName).toBe(doc.lastName);
    expect(user.displayName).toBe(doc.displayName);
    expect(user.email).toBe(doc.email);
    expect(user.password).toBe(doc.password);
  });

  it('successfully creates the documents for the users collection', async () => {
    const createdUsers = await dbContext.collections
      .Users
      .model
      .insertMany(randomUsers);
    expect(createdUsers).toHaveLength(TEST_ENTITITIES_AMOUNT);
  });

  it('successfully finds the documents for the users collection', async () => {
    const users = await dbContext.collections
      .Users
      .model
      .find({});
    expect(users).toHaveLength(TEST_ENTITITIES_AMOUNT + 1);
  });

  it('successfully updates the documents for the users collection', async () => {
    const users = await dbContext.collections
      .Users
      .model
      .find({});
    for await (const user of users) {
      await dbContext.collections
        .Users
        .model
        .update({ uuid: user.uuid }, { displayName: faker.internet.userName() });
    }
    const updatedUsers = await dbContext.collections
      .Users
      .model
      .find({});
    expect(updatedUsers).toHaveLength(TEST_ENTITITIES_AMOUNT + 1);
    updatedUsers.forEach(user => {
      expect(user.updatedAt.getTime()).toBeGreaterThan(user.createdAt.getTime());
    });
  });

  it('successfully deletes the documents for the users collection', async () => {
    const users = await dbContext.collections
      .Users
      .model
      .deleteMany({});
    expect(users.deletedCount).toBe(TEST_ENTITITIES_AMOUNT + 1);
  });
  
  describe('user delete hooks', () => {
    let user: UserDocument;
    let survey: SurveyDocument;

    beforeEach(async () => {
      user = await new dbContext.collections.Users.model(generateUserDocument()).save();
      const graph = await new dbContext.collections.Graphs.model().save();
      survey = await new dbContext.collections.Surveys.model(generateSurveyDocument(user, graph)).save();
      survey = await createSimpleSurveyGraph(dbContext, survey, simpleSurveyData);
      await new dbContext.collections.Results.model(generateResultDocument(survey, faker.internet.email())).save();
    });

    it('deletes all of the related survey, graph, closure, question, answer, and result documents when deleting the user (through document)', async () => {
      await user.deleteOne();
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
      const resultDocsCount = await dbContext.collections.Results.model.countDocuments({ surveyId: survey.uuid });
      expect(resultDocsCount).toBe(0);
    });
    
    it('deletes all of the related survey, graph, closure, question, answer, and result documents when deleting the user (through query)', async () => {
      await dbContext.collections.Users.model.deleteOne({ uuid: user.uuid });
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
      const resultDocsCount = await dbContext.collections.Results.model.countDocuments({ surveyId: survey.uuid });
      expect(resultDocsCount).toBe(0);
    });
    
    it('deletes all of the related survey, graph, closure, question, answer, and result documents when deleting the user (through findOneAndDelete)', async () => {
      await dbContext.collections.Users.model.findOneAndDelete({ uuid: user.uuid });
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
      const resultDocsCount = await dbContext.collections.Results.model.countDocuments({ surveyId: survey.uuid });
      expect(resultDocsCount).toBe(0);
    });
  });
});
