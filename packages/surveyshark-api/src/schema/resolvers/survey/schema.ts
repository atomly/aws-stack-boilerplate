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

type SurveyCustomization {
  color: String!
}

type Survey {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  status: SurveyStatuses!
  user: User!
  name: String!
  description: String
  graph: Graph!
  startingVertex: GraphVertex
  closingVertex: GraphVertex
  customization: SurveyCustomization!
}

input QueryReadSurveyInput {
  uuid: ID!
}

type Query {
  readSurvey(input: QueryReadSurveyInput!): Survey
  readSurveys(withData: Boolean): [Survey!]!
}

input SurveyCustomizationInput {
  color: String!
}

input MutationCreateSurveyInput {
  name: String!
  description: String
  customization: SurveyCustomizationInput
}

input MutationUpdateSurveyInput {
  uuid: ID!
  status: SurveyStatuses
  name: String
  description: String
  data: JSON
  customization: SurveyCustomizationInput
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
