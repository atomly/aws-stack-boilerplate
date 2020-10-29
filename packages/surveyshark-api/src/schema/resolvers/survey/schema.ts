import gql from 'graphql-tag';

export default gql`
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
  fillUrlQrCode: String
  graph: Graph!
  startingVertex: GraphVertex
  closingVertex: GraphVertex
  customization: SurveyCustomization!
}

type SurveyValidationError {
  vertexKey: ID!
  error: String!
}

input QueryReadSurveyInput {
  uuid: ID!
}

input QueryValidateSurveyInput {
  uuid: ID!
}

type Query {
  readSurvey(input: QueryReadSurveyInput!): Survey
  readSurveys(withData: Boolean): [Survey!]!
  validateSurvey(input: QueryValidateSurveyInput!): [SurveyValidationError]
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
