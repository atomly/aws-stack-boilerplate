// Libraries
import faker from 'faker';

// Dependencies
import {
  GraphVertexDocument,
  AnswerDocument,
} from '../../src';
import { dbContext } from '../contants';
import {
  generateGraphVertexDocument,
  generateAnswerDocument,
} from '../fixtures';
import { dropDatabase } from '../utils';

const doc = generateAnswerDocument();
let answer: AnswerDocument<string>;
let answerVertex: GraphVertexDocument<AnswerDocument<string>>;

describe('answers collection works correctly', () => {
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

  it('sucessfully creates a valid answer document', async () => {
    answer = await new dbContext
      .collections
      .Answers
      .model(doc).save() as AnswerDocument<string>;
    expect(answer.surveyId).toBe(doc.surveyId);
    expect(answer.type).toBe(doc.type);
    expect(answer.subType).toBe(doc.subType);
    expect(answer.parentQuestionId).toBe(doc.parentQuestionId);
    expect(answer.displayText).toBe(doc.displayText);
    expect(answer.data).toBe(doc.data);
  });

  it('successfully attaches an answer to a vertex\' value via MongoDB references', async () => {
    answerVertex = await new dbContext
      .collections
      .GraphVertices
      .model(generateGraphVertexDocument(faker.random.uuid(), answer)).save() as GraphVertexDocument<AnswerDocument<string>>;
    expect(answerVertex.value).toMatchObject(answer);
  });

  it('updating an answer also updates the reference attached to a vertex', async () => {
    const newDisplayText = faker.random.words();
    await dbContext.collections.Answers.model.updateOne(
      { uuid: answer.uuid },
      { displayText: newDisplayText },
    );
    const updatedQuestion = await dbContext
      .collections
      .Answers
      .model.findOne({ uuid: answer.uuid }).lean() as AnswerDocument<string>;
    expect(updatedQuestion!.displayText).not.toBe(answer.displayText);
    expect(updatedQuestion!.displayText).toBe(newDisplayText);
    const updatedVertex = await dbContext
      .collections
      .GraphVertices
      .model.findOne({ uuid: answerVertex.uuid }).populate('value').lean() as GraphVertexDocument<AnswerDocument<string>>;
    expect(updatedVertex!.value).toMatchObject(updatedQuestion!);
    answer = updatedQuestion;
    answerVertex = updatedVertex;
  });
});
