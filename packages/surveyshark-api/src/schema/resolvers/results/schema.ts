import gql from 'graphql-tag';

export default gql`
type ResultData {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  question: Question!
  answer: JSONObject!
}

type Result {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  data: [ResultData!]!
  identifier: String
}

input ResultDataInput {
  questionId: ID!
  answer: JSONObject!
}

input QueryReadResultInput {
  uuid: ID!
}

input QueryReadResultsInput {
  surveyId: ID!
}

type Query {
  readResult(input: QueryReadResultInput!): Result
  readResults(input: QueryReadResultsInput!): [Result!]!
}

input MutationCreateResultInput {
  surveyId: ID!
  data: [ResultDataInput!]!
  identifier: String
}

input MutationUpdateResultInput {
  uuid: ID!
  identifier: String
}

input MutationDeleteResultInput {
  uuid: ID!
}

type Mutation {
  createResult(input: MutationCreateResultInput!): Result
  updateResult(input: MutationUpdateResultInput!): Result
  deleteResult(input: MutationDeleteResultInput!): Result
}
`;
