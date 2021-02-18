import gql from 'graphql-tag';

export default gql`
input QuerySubPingInput {
  message: String!
}

type Query {
  subPing(input: QuerySubPingInput!): String
}

type Subscription {
  subPong: String
  greetings: String
}
`;
