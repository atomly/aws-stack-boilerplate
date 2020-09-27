import gql from 'graphql-tag';

export default gql`
union GraphVertexValue = Question | Closure | Answer

type Graph {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  vertices: [GraphVertex!]!
  edges: [GraphEdge!]!
}

type GraphVertex {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  graphId: ID!
  key: String!
  value: GraphVertexValue!
}

type GraphEdge {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  graphId: ID!
  from: GraphVertex!
  to: GraphVertex!
  weight: Int
}

type Survey {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  status: SurveyStatuses!
  user: User!
  name: String!
  graph: Graph!
  startingVertex: GraphVertex
  closingVertex: GraphVertex
}

input QueryReadSurveyInput {
  uuid: ID!
}

type Query {
  readSurvey(input: QueryReadSurveyInput!): Survey
  readSurveys(withData: Boolean): [Survey!]!
}

input MutationCreateSurveyInput {
  name: String!
}

input MutationUpdateSurveyInput {
  uuid: ID!
  status: SurveyStatuses
  name: String!
  displayText: String
  data: JSON
}

input  MutationDeleteSurveyInput {
  uuid: ID!
}

type Mutation {
  createSurvey(input: MutationCreateSurveyInput!): Survey
  updateSurvey(input: MutationUpdateSurveyInput!): Survey
  deleteSurvey(input: MutationDeleteSurveyInput!): Survey
}
`;
