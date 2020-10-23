import gql from 'graphql-tag';

export default gql`
type CustomerPaymentMethodDetailsCard {
  lastFourDigits: String!
  expMonth: String!
  expYear: String!
  fingerprint: String!
}

type CustomerPaymentMethodDetailsAddress {
  city: String
  country: String
  line1: String
  line2: String
  postalCode: String
  state: String
}

type CustomerPaymentMethodDetails {
  card: CustomerPaymentMethodDetailsCard!
  address: CustomerPaymentMethodDetailsAddress!
  email: String
  name: String
  phone: String
}

type CustomerPaymentMethod {
  externalId: String!
  details: CustomerPaymentMethodDetails!
}

type Customer {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  userId: ID!
  externalId: ID!
  currency: String!
  externalDefaultPaymentMethodId: ID
  paymentMethods: [CustomerPaymentMethod!]!
  invoicePrefix: String
}

type Product {
  externalId: String!
  name: String!
  description: String
  metadata: JSON
}

type PriceRecurring {
  interval: String!
  intervalCount: Int!
}

type Price {
  externalId: String!
  nickname: String!
  currency: String!
  unitAmount: Int!
  recurring: PriceRecurring!
  metadata: JSON
}

type Plan {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  name: String!
  description: String!
  isActive: Boolean!
  product: Product!
  price: Price!
  metadata: JSON!
}

type SubscriptionItems {
  externalId: String!
  externalPriceId: String!
  quantity: Int!
}

type Subscription {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  userId: ID!
  externalId: String!
  externalCustomerId: String!
  currentPeriodEnd: Date;
  items: [SubscriptionItems!]!
  status: String!
  collectionMethod: String!
  externalLatestInvoiceId: String
}

type Query {
  readSelfSubscription(input: QueryReadSelfSubscriptionInput!): Subscription
}
`;
