// Libraries
import request from 'supertest';
import faker from 'faker';

// Types
import { Result, SurveyDocument } from '@atomly/template-collections-lib';
import { SimpleSurveyData } from '../types';

// Dependencies
import { context as c } from '../../src/context';
import { app } from '../app';
import { dropDatabase } from '../utils';
import { generateResultDocument, generateUserDocument, createSimpleSurveyGraph, generateSurveyDocument } from '../fixtures';

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

describe('POST /survey_export_results', function() {
  beforeAll(async () => {
    await c.dbContext.open();
    const user = await new c.dbContext.collections.Users.model(generateUserDocument()).save();
    survey = await new c.dbContext.collections.Surveys.model(generateSurveyDocument(user)).save();
    survey = await createSimpleSurveyGraph(c.dbContext, survey, simpleSurveyData);
    Promise.all([
      new c.dbContext.collections.Results.model(generateResultDocument(
        survey,
        faker.internet.email(),
      )).save(),
      new c.dbContext.collections.Results.model(generateResultDocument(
        survey,
        faker.internet.email(),
      )).save(),
    ]);
  });

  afterAll(async () => {
    await dropDatabase(c.dbContext);
    await c.dbContext.close();
  });

  it('empty request body responds with status 400 and error json', async () => {
    const response = await request(app)
      .post('/survey_export_results')
      .set('Accept', 'application/json');

    expect(response.status).toBe(400);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body.errors).toBeInstanceOf(Array);
  });

  it('fake request body survey UUID responds with status 200 and empty array', async () => {
    const response = await new Promise<request.Response>((resolve, reject) => {
      request(app)
        .post('/survey_export_results')
        .set('Accept', 'application/json')
        .send({
          surveyId: faker.random.uuid(),
          fileFormat: 'json',
        })
        .buffer()
        .parse(function(res, callback) {
          const docs: Result[] = [];
          res.on('data', function(doc: string) {
            docs.push(JSON.parse(doc));
          });
          res.on('end', function() {
            callback(null, docs);
          });
        })
        .end(function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });
  
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('responds with status 200 and json', async () => {
    const surveyId = survey.uuid;

    const response = await new Promise<request.Response>((resolve, reject) => {
      request(app)
        .post('/survey_export_results')
        .set('Accept', 'application/json')
        .send({
          surveyId,
          fileFormat: 'json',
        })
        .buffer()
        .parse(function(res, callback) {
          const docs: Result[] = [];
          res.on('data', function(doc: string) {
            docs.push(JSON.parse(doc));
          });
          res.on('error', function(err) {
            callback(err, []);
          });
          res.on('end', function() {
            callback(null, docs);
          });
        })
        .end(function(err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
    });

    const results = await c.dbContext.collections.Results
      .model
      .find({ surveyId });
  
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(results.length);
    expect(JSON.stringify(response.body)).toBe(JSON.stringify(results));
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
