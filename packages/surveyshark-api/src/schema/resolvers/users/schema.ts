import gql from 'graphql-tag';

export default gql`
type User {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  provider: String
  providerId: String
  firstName: String
  lastName: String
  displayName: String
  email: ID!
  # password: String
}

input QueryUserInput {
  uuid: ID!
}

input QueryDefaultAuthenticationInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  displayName: String
}

# input QueryProviderAuthenticationInput {
#   email: String!
#   provider: AuthenticationProviders!
# }

type Query {
  user(input: QueryUserInput!): User
  # users: [User]
  me: User
  defaultAuthentication(input: QueryDefaultAuthenticationInput!): User
  # providerAuthentication(input: QueryProviderAuthenticationInput!): User
  deauthentication: Boolean!
}

input MutationDefaultAuthenticationInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  displayName: String
}

# enum AuthenticationProviders {
#   GOOGLE
# }

# input MutationProviderAuthenticationInput {
#   email: String!
#   provider: AuthenticationProviders!
# }

# union AuthInput = MutationDefaultAuthenticationInput | MutationProviderAuthenticationInput

type Mutation {
  defaultAuthentication(input: MutationDefaultAuthenticationInput!): User
  # providerAuthentication(input: MutationProviderAuthenticationInput!): User
}
`;
