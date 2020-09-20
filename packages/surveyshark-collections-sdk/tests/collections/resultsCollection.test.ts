// Libraries
import faker from 'faker';

// Dependencies
import { dbContext } from '../contants';
import { dropDatabase } from '../utils';

// Types
import {
  SurveyDocument,
  ResultDocument,
} from '../../src';
import {
  generateResultDocument,
  generateSurveyDocument,
  generateUserDocument,
  createSimpleSurveyGraph,
} from '../fixtures';
import { SimpleSurveyData } from '../types';

//
// FIXTURES
//

const simpleSurveyData: SimpleSurveyData = [
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

let survey: SurveyDocument;
let result: ResultDocument;

describe('answers collection works correctly', () => {
  beforeAll(
    async () => {
      await dbContext.open();
      const user = await new dbContext.collections.Users.model(generateUserDocument()).save();
      survey = await new dbContext.collections.Surveys.model(generateSurveyDocument(user)).save();
      survey = await createSimpleSurveyGraph(dbContext, survey, simpleSurveyData);
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

  it('successfully creates a result document', async () => {
    const doc = generateResultDocument(survey, faker.internet.email());
    result = await new dbContext.collections.Results.model(doc).save();
    expect(result).toBeTruthy();
    expect(result.uuid).toBeTruthy();
    expect(result.createdAt).toBeTruthy();
    expect(result.updatedAt).toBeTruthy();
    expect(result.data).toHaveLength(amountOfQuestions);
    expect(result.identifier).toBeTruthy();
  });
});
