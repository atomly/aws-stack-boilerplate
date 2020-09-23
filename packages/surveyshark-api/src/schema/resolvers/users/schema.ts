import gql from 'graphql-tag';

export default gql`
type User {
  uuid: ID!
  createdAt: Date
  updatedAt: Date
  provider: String
  providerId: String
  firstName: String
  lastName: String
  displayName: String
  email: ID!
  # password: String
}

input FindUserInput {
  uuid: ID!
}

# input DefaultAuthenticationInput {
#   email: String!
#   password: String!
# }

enum AuthenticationProviders {
  GOOGLE
}

input ProviderAuthenticationInput {
  email: String!
  provider: AuthenticationProviders!
}

# union AuthInput = DefaultAuthenticationInput | ProviderAuthenticationInput

type Query {
  user(input: FindUserInput!): User
  # users: [User]
  me: User
  # defaultAuthentication(input: DefaultAuthenticationInput!): User
  providerAuthentication(input: ProviderAuthenticationInput!): User
  deauthentication: Boolean!
}

type Mutation {
  # defaultAuthentication(input: DefaultAuthenticationInput!): User
  providerAuthentication(input: ProviderAuthenticationInput!): User
}
`;
