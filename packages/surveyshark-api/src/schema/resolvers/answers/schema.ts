import gql from 'graphql-tag';

export default gql`
type Answer {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  parentQuestionId: ID!
  type: String!
  subType: String!
  name: String
  data: JSONObject!
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
  name: String
  subType: QuestionTypes!
  data: JSONObject!
}

input MutationUpdateAnswerInput {
  uuid: ID!
  name: String
  data: JSONObject
}

input  MutationDeleteAnswerInput {
  uuid: ID!
}

type Mutation {
  createAnswer(input: MutationCreateAnswerInput!): GraphVertex
  updateAnswer(input: MutationUpdateAnswerInput!): GraphVertex
  deleteAnswer(input: MutationDeleteAnswerInput!): GraphVertex
}
`;
