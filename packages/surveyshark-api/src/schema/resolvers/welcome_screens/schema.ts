import gql from 'graphql-tag';

export default gql`
type WelcomeScreen {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  type: String!
  name: String
  description: String
}

input QueryReadWelcomeScreenInput {
  uuid: ID!
}

input QueryReadWelcomeScreensInput {
  surveyId: ID!
}

type Query {
  readWelcomeScreen(input: QueryReadWelcomeScreenInput!, withAnswers: Boolean): WelcomeScreen
  readWelcomeScreens(input: QueryReadWelcomeScreensInput!, withAnswers: Boolean): [WelcomeScreen!]!
}

input MutationCreateWelcomeScreenInput {
  surveyId: ID!
  parentWelcomeScreenId: ID!
  type: SurveyTypes!
  name: String
  description: String
}

input MutationUpdateWelcomeScreenInput {
  uuid: ID!
  name: String
  description: String
  data: JSON
}

input  MutationDeleteWelcomeScreenInput {
  uuid: ID!
}

type Mutation {
  createWelcomeScreen(input: MutationCreateWelcomeScreenInput!): WelcomeScreen
  updateWelcomeScreen(input: MutationUpdateWelcomeScreenInput!): WelcomeScreen
  deleteWelcomeScreen(input: MutationDeleteWelcomeScreenInput!): WelcomeScreen
}
`;
