import gql from 'graphql-tag';

export default gql`
type Answer {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  parentQuestionId: ID!
  type: SurveyTypes!
  subType: QuestionTypes!
  displayText: String!
  data: JSON
}

input QueryReadAnswerInput {
  uuid: ID!
}

input QueryReadAnswersInput {
  surveyId: ID!
  parentQuestionId: ID!
}

type Query {
  readAnswer(input: QueryReadAnswerInput!): Answer
  readAnswers(input: QueryReadAnswersInput!): [Answer!]!
}

input MutationCreateAnswerInput {
  surveyId: ID!
  parentQuestionId: ID!
  displayText: String!
  data: JSON
}

input MutationUpdateAnswerInput {
  uuid: ID!
  displayText: String!
  data: JSON
}

input  MutationDeleteAnswerInput {
  uuid: ID!
}

type Mutation {
  createAnswer(input: MutationCreateAnswerInput!): Answer
  updateAnswer(input: MutationUpdateAnswerInput!): Answer
  deleteAnswer(input: MutationDeleteAnswerInput!): Answer
}
`;
