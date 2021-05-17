// Libraries
import request from 'supertest';
import faker from 'faker';

// Types
import { SurveyDocument, SurveyStatuses, Survey } from '@atomly/entities-lib-boilerplate';
import { SimpleSurveyData } from '../types';

// Dependencies
import { context as c } from '../../src/context';
import { app } from '../app';
import { dropDatabase } from '../utils';
import { generateUserDocument, createSimpleSurveyGraph, generateSurveyDocument } from '../fixtures';

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

let survey: SurveyDocument;

describe('POST /survey_fill_url_qr_code', function() {
  beforeAll(async () => {
    await c.dbContext.open();
    const user = await new c.dbContext.collections.Users.model(generateUserDocument()).save();
    survey = await new c.dbContext.collections.Surveys.model(generateSurveyDocument(user)).save();
    survey = await createSimpleSurveyGraph(c.dbContext, survey, simpleSurveyData);
    await survey.update({ status: SurveyStatuses.PUBLISHED });
  });

  afterAll(async () => {
    await dropDatabase(c.dbContext);
    await c.dbContext.close();
  });

  it('empty request body responds with status 400 and error json', async () => {
    const response = await request(app)
      .post('/survey_fill_url_qr_code')
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.errors).toBeInstanceOf(Array);
  });

  it('fake request body survey UUID responds with status 200 and null response body', async () => {
    const response = await request(app)
      .post('/survey_fill_url_qr_code')
      .set('Accept', 'application/json')
      .send({
        surveyId: faker.random.uuid(),
        baseUrl: 'http://www.example.com/',
      });

    expect(response.status).toBe(200);
    expect(response.body).toBe(null);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('responds with status 200 and json', async () => {
    const response = await request(app)
      .post('/survey_fill_url_qr_code')
      .set('Accept', 'application/json')
      .send({
        surveyId: survey.uuid,
        baseUrl: 'http://www.example.com/',
      });

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect((response.body as Survey).uuid).toBe(survey.uuid);
      expect((response.body as Survey).fillUrlQrCode).toBeTruthy();
      expect((response.body as Survey).fillUrlQrCode).toMatch(/data:image\/png;base64/);
      expect(response.headers['content-type']).toMatch(/json/);
  });
});
