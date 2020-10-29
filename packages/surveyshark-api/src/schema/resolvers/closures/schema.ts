import gql from 'graphql-tag';

export default gql`
type Closure {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  type: String!
  name: String
  description: String
}

input QueryReadClosureInput {
  uuid: ID!
}

input QueryReadClosuresInput {
  surveyId: ID!
}

type Query {
  readClosure(input: QueryReadClosureInput!, withAnswers: Boolean): Closure
  readClosures(input: QueryReadClosuresInput!, withAnswers: Boolean): [Closure!]!
}

input MutationCreateClosureInput {
  surveyId: ID!
  parentClosureId: ID!
  type: SurveyTypes!
  name: String
  description: String
}

input MutationUpdateClosureInput {
  uuid: ID!
  name: String
  description: String
}

input  MutationDeleteClosureInput {
  uuid: ID!
}

type Mutation {
  createClosure(input: MutationCreateClosureInput!): Closure
  updateClosure(input: MutationUpdateClosureInput!): Closure
  deleteClosure(input: MutationDeleteClosureInput!): Closure
}
`;
