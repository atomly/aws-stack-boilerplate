import gql from 'graphql-tag';

export default gql`
type Closure {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  type: SurveyTypes!
  displayText: String!
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
  displayText: String!
}

input MutationUpdateClosureInput {
  uuid: ID!
  displayText: String!
  data: JSON
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
