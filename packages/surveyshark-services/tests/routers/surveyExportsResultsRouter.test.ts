// Libraries
import request from 'supertest';
import faker from 'faker';

// Dependencies
import { context as c } from '../../src/context';
import { app } from '../app';

describe('POST /survey_export_results', function() {
  beforeAll(async () => {
    await c.dbContext.open();
  });

  afterAll(async () => {
    await c.dbContext.close();
  });

  // it('empty request body responds with status 400 and error json', async () => {
  //   const response = await request(app)
  //     .post('/survey_export_results')
  //     .set('Accept', 'application/json');
  
  //   expect(response.status).toBe(400);
  //   expect(response.headers['content-type']).toMatch(/json/);
  //   expect(response.body.errors).toBeInstanceOf(Array);
  // });

  it('invalid request body survey UUID responds with status 400 and error json', async () => {
    const response = await new Promise<request.Response>((resolve, _reject) => {
      request(app)
        .post('/survey_export_results')
        .send({
          surveyId: faker.random.uuid(),
          fileFormat: 'json',
        })
        .set('Accept', 'application/json')
        .buffer()
        .parse(function(res, callback) {
          const chunks = [];
          res.setEncoding('binary');
          res.on('data', function(chunk) {
            console.log('chunk: ', chunk);
            chunks.push(chunk);
          });
          res.on('end', function() {
            callback(null, Buffer.from(chunks));
          });
        })
        .end(function(err, res) {
          console.log('err: ', err);
          // console.log('res: ', res);
          resolve(res);
      });
    });
  
    console.log('response.body: ', response.body);
    const buffer = response.body as Buffer;
    const data = buffer.toString('utf-8');
    console.log('data: ', data);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  // it('responds with status 200 and json', async () => {
  //   const response = await request(app)
  //     .post('/survey_export_results')
  //     .send({
        
  //     })
  //     .set('Accept', 'application/json');
  
  //   console.log('response.body: ', response.body);

  //   expect(response.status).toBe(200);
  //   expect(response.headers['content-type']).toMatch(/json/);
  // });
});
