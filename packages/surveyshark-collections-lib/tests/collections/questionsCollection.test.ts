// Libraries
import faker from 'faker';

// Dependencies
import {
  GraphVertexDocument,
  QuestionDocument,
} from '../../src';
import { dbContext } from '../contants';
import {
  generateGraphVertexDocument,
  generateQuestionDocument,
  generateAnswerDocument,
} from '../fixtures';
import { dropDatabase } from '../utils';

const doc = generateQuestionDocument();
let question: QuestionDocument<string>;
let questionVertex: GraphVertexDocument<QuestionDocument<string>>;

describe('questions collection works correctly', () => {
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

  it('sucessfully creates a valid question document', async () => {
    question = await new dbContext
      .collections
      .Questions
      .model(doc).save() as QuestionDocument<string>;
    expect(question.surveyId).toBe(doc.surveyId);
    expect(question.type).toBe(doc.type);
    expect(question.subType).toBe(doc.subType);
    expect(question.name).toBe(doc.name);
    expect(question.data).toBe(doc.data);
  });

  it('successfully attaches a question to a vertex\' value via MongoDB references', async () => {
    questionVertex = await new dbContext
      .collections
      .GraphVertices
      .model(generateGraphVertexDocument(faker.random.uuid(), question)).save() as GraphVertexDocument<QuestionDocument<string>>;
    expect(questionVertex.value).toMatchObject(question);
  });

  it('updating a question also updates the reference attached to a vertex', async () => {
    const newDisplayText = faker.random.words();
    await dbContext.collections.Questions.model.updateOne(
      { uuid: question.uuid },
      { name: newDisplayText },
    );
    const updatedQuestion = await dbContext
      .collections
      .Questions
      .model.findOne({ uuid: question.uuid }).lean() as QuestionDocument<string>;
    expect(updatedQuestion!.name).not.toBe(question.name);
    expect(updatedQuestion!.name).toBe(newDisplayText);
    const updatedVertex = await dbContext
      .collections
      .GraphVertices
      .model.findOne({ uuid: questionVertex.uuid }).populate('value').lean() as GraphVertexDocument<QuestionDocument<string>>;
    expect(updatedVertex!.value).toMatchObject(updatedQuestion!);
    question = updatedQuestion;
    questionVertex = updatedVertex;
  });

  it('removes a question (through query) removes its respective answers', async () => {
    // Creating related answers
    const answersDisplayTexts = [
      faker.random.words(),
      faker.random.words(),
      faker.random.words(),
    ];
    const randomSurveyId = faker.random.uuid();
    for await (const answerDisplayText of answersDisplayTexts) {
      await new dbContext
        .collections
        .Answers
        .model(generateAnswerDocument(randomSurveyId, question.uuid, answerDisplayText)).save();
    }
    // Answers should be related to the question:
    let answersCount: number;
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(answersDisplayTexts.length);
    // Deleting question:
    await dbContext.collections.Questions.model.deleteOne({ uuid: question.uuid });
    // Answers should be deleted:
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(0);
  });

  it('removes a question (through findOneAndDelete) removes its respective answers', async () => {
    question = await new dbContext
      .collections
      .Questions
      .model(doc).save() as QuestionDocument<string>;
    // Creating related answers
    const answersDisplayTexts = [
      faker.random.words(),
      faker.random.words(),
      faker.random.words(),
    ];
    const randomSurveyId = faker.random.uuid();
    for await (const answerDisplayText of answersDisplayTexts) {
      await new dbContext
        .collections
        .Answers
        .model(generateAnswerDocument(randomSurveyId, question.uuid, answerDisplayText)).save();
    }
    // Answers should be related to the question:
    let answersCount: number;
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(answersDisplayTexts.length);
    // Deleting question:
    await dbContext.collections.Questions.model.findOneAndDelete({ uuid: question.uuid });
    // Answers should be deleted:
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(0);
  });

  it('removes a question (through document) removes its respective answers', async () => {
    question = await new dbContext
      .collections
      .Questions
      .model(doc).save() as QuestionDocument<string>;
    // Creating related answers
    const answersDisplayTexts = [
      faker.random.words(),
      faker.random.words(),
      faker.random.words(),
    ];
    const randomSurveyId = faker.random.uuid();
    for await (const answerDisplayText of answersDisplayTexts) {
      await new dbContext
        .collections
        .Answers
        .model(generateAnswerDocument(randomSurveyId, question.uuid, answerDisplayText)).save();
    }
    // Answers should be related to the question:
    let answersCount: number;
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(answersDisplayTexts.length);
    // Deleting question:
    await question.deleteOne();
    // Answers should be deleted:
    answersCount = await dbContext.collections.Answers.model.count({ parentQuestionId: question.uuid });
    expect(answersCount).toBe(0);
  });
});
