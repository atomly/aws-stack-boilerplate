import gql from 'graphql-tag';

export default gql`
union GraphVertexValue = Question | Closure | Answer | WelcomeScreen

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
  value: GraphVertexValue
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

input QueryReadGraphEdgeInput {
  fromVertexKey: ID!
  toVertexKey: ID!
}

input QueryReadGraphEdgesInput {
  fromVertexKey: ID
  toVertexKey: ID
}

type Query {
  readGraphEdge(input: QueryReadGraphEdgeInput!): GraphEdge
  readGraphEdges(input: QueryReadGraphEdgesInput!): [GraphEdge!]!
}

input MutationCreateGraphEdgeInput {
  fromVertexKey: ID!
  toVertexKey: ID!
}

input MutationUpdateGraphEdgeInput {
  fromVertexKey: ID!
  toVertexKey: ID!
  weight: Int
}

input  MutationDeleteGraphEdgeInput {
  fromVertexKey: ID!
  toVertexKey: ID!
}

type Mutation {
  createGraphEdge(input: MutationCreateGraphEdgeInput!): GraphEdge
  updateGraphEdge(input: MutationUpdateGraphEdgeInput!): GraphEdge
  deleteGraphEdge(input: MutationDeleteGraphEdgeInput!): GraphEdge
}
`;
