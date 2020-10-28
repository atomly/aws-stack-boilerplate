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
  data: JSON!
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
  data: JSON!
}

input MutationUpdateAnswerInput {
  uuid: ID!
  name: String
  data: JSON!
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
