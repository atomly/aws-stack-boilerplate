import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type Answer = {
  __typename?: 'Answer';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  parentQuestionId: Scalars['ID'];
  type: Scalars['String'];
  subType: Scalars['String'];
  name: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
};

export type QueryReadAnswerInput = {
  uuid: Scalars['ID'];
};

export type QueryReadAnswersInput = {
  surveyId: Scalars['ID'];
  parentQuestionId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  readAnswer?: Maybe<Answer>;
  readAnswers: Array<Answer>;
  readClosure?: Maybe<Closure>;
  readClosures: Array<Closure>;
  readGraphEdge?: Maybe<GraphEdge>;
  readGraphEdges: Array<GraphEdge>;
  readPlans: Array<Plan>;
  readSelfCustomer?: Maybe<Customer>;
  readSelfSubscription?: Maybe<Subscription>;
  test: Scalars['String'];
  ping: Scalars['String'];
  readQuestion?: Maybe<Question>;
  readQuestions: Array<Question>;
  readResult?: Maybe<Result>;
  readResults: Array<Result>;
  subPing?: Maybe<Scalars['String']>;
  readSurvey?: Maybe<Survey>;
  readSurveys: Array<Survey>;
  validateSurvey?: Maybe<Array<Maybe<SurveyValidationError>>>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  defaultAuthentication?: Maybe<User>;
  deauthentication: Scalars['Boolean'];
  readWelcomeScreen?: Maybe<WelcomeScreen>;
  readWelcomeScreens: Array<WelcomeScreen>;
};


export type QueryReadAnswerArgs = {
  input: QueryReadAnswerInput;
};


export type QueryReadAnswersArgs = {
  input: QueryReadAnswersInput;
};


export type QueryReadClosureArgs = {
  input: QueryReadClosureInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadClosuresArgs = {
  input: QueryReadClosuresInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadGraphEdgeArgs = {
  input: QueryReadGraphEdgeInput;
};


export type QueryReadGraphEdgesArgs = {
  input: QueryReadGraphEdgesInput;
};


export type QueryReadQuestionArgs = {
  input: QueryReadQuestionInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadQuestionsArgs = {
  input: QueryReadQuestionsInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadResultArgs = {
  input: QueryReadResultInput;
};


export type QueryReadResultsArgs = {
  input: QueryReadResultsInput;
};


export type QuerySubPingArgs = {
  input: QuerySubPingInput;
};


export type QueryReadSurveyArgs = {
  input: QueryReadSurveyInput;
};


export type QueryReadSurveysArgs = {
  withData?: Maybe<Scalars['Boolean']>;
};


export type QueryValidateSurveyArgs = {
  input: QueryValidateSurveyInput;
};


export type QueryUserArgs = {
  input: QueryUserInput;
};


export type QueryDefaultAuthenticationArgs = {
  input: QueryDefaultAuthenticationInput;
};


export type QueryReadWelcomeScreenArgs = {
  input: QueryReadWelcomeScreenInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadWelcomeScreensArgs = {
  input: QueryReadWelcomeScreensInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};

export type MutationCreateAnswerInput = {
  surveyId: Scalars['ID'];
  parentQuestionId: Scalars['ID'];
  name: Scalars['String'];
  subType: QuestionTypes;
  data?: Maybe<Scalars['JSON']>;
};

export type MutationUpdateAnswerInput = {
  uuid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
};

export type MutationDeleteAnswerInput = {
  uuid: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAnswer?: Maybe<Answer>;
  updateAnswer?: Maybe<Answer>;
  deleteAnswer?: Maybe<Answer>;
  createClosure?: Maybe<Closure>;
  updateClosure?: Maybe<Closure>;
  deleteClosure?: Maybe<Closure>;
  createGraphEdge?: Maybe<GraphEdge>;
  updateGraphEdge?: Maybe<GraphEdge>;
  deleteGraphEdge?: Maybe<GraphEdge>;
  createSelfSubscription?: Maybe<Subscription>;
  updateSelfSubscription?: Maybe<Subscription>;
  cancelSelfSubscription?: Maybe<Subscription>;
  createQuestion?: Maybe<Question>;
  updateQuestion?: Maybe<Question>;
  deleteQuestion?: Maybe<Question>;
  createResult?: Maybe<Result>;
  updateResult?: Maybe<Result>;
  deleteResult?: Maybe<Result>;
  createSurvey?: Maybe<Survey>;
  updateSurvey?: Maybe<Survey>;
  deleteSurvey?: Maybe<Survey>;
  defaultAuthentication?: Maybe<User>;
  createWelcomeScreen?: Maybe<WelcomeScreen>;
  updateWelcomeScreen?: Maybe<WelcomeScreen>;
  deleteWelcomeScreen?: Maybe<WelcomeScreen>;
};


export type MutationCreateAnswerArgs = {
  input: MutationCreateAnswerInput;
};


export type MutationUpdateAnswerArgs = {
  input: MutationUpdateAnswerInput;
};


export type MutationDeleteAnswerArgs = {
  input: MutationDeleteAnswerInput;
};


export type MutationCreateClosureArgs = {
  input: MutationCreateClosureInput;
};


export type MutationUpdateClosureArgs = {
  input: MutationUpdateClosureInput;
};


export type MutationDeleteClosureArgs = {
  input: MutationDeleteClosureInput;
};


export type MutationCreateGraphEdgeArgs = {
  input: MutationCreateGraphEdgeInput;
};


export type MutationUpdateGraphEdgeArgs = {
  input: MutationUpdateGraphEdgeInput;
};


export type MutationDeleteGraphEdgeArgs = {
  input: MutationDeleteGraphEdgeInput;
};


export type MutationCreateSelfSubscriptionArgs = {
  input: MutationCreateSelfSubscriptionInput;
  details: MutationCreateSelfSubscriptionDetails;
  card: MutationCreateSelfSubscriptionCard;
  address: MutationCreateSelfSubscriptionAddress;
};


export type MutationUpdateSelfSubscriptionArgs = {
  input: MutationUpdateSelfSubscriptionInput;
  details: MutationCreateSelfSubscriptionDetails;
  card: MutationCreateSelfSubscriptionCard;
  address: MutationCreateSelfSubscriptionAddress;
};


export type MutationCancelSelfSubscriptionArgs = {
  input?: Maybe<MutationCancelSelfSubscriptionInput>;
};


export type MutationCreateQuestionArgs = {
  input: MutationCreateQuestionInput;
};


export type MutationUpdateQuestionArgs = {
  input: MutationUpdateQuestionInput;
};


export type MutationDeleteQuestionArgs = {
  input: MutationDeleteQuestionInput;
};


export type MutationCreateResultArgs = {
  input: MutationCreateResultInput;
};


export type MutationUpdateResultArgs = {
  input: MutationUpdateResultInput;
};


export type MutationDeleteResultArgs = {
  input: MutationDeleteResultInput;
};


export type MutationCreateSurveyArgs = {
  input: MutationCreateSurveyInput;
};


export type MutationUpdateSurveyArgs = {
  input: MutationUpdateSurveyInput;
};


export type MutationDeleteSurveyArgs = {
  input: MutationDeleteSurveyInput;
};


export type MutationDefaultAuthenticationArgs = {
  input: MutationDefaultAuthenticationInput;
};


export type MutationCreateWelcomeScreenArgs = {
  input: MutationCreateWelcomeScreenInput;
};


export type MutationUpdateWelcomeScreenArgs = {
  input: MutationUpdateWelcomeScreenInput;
};


export type MutationDeleteWelcomeScreenArgs = {
  input: MutationDeleteWelcomeScreenInput;
};

export type Closure = {
  __typename?: 'Closure';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type QueryReadClosureInput = {
  uuid: Scalars['ID'];
};

export type QueryReadClosuresInput = {
  surveyId: Scalars['ID'];
};

export type MutationCreateClosureInput = {
  surveyId: Scalars['ID'];
  parentClosureId: Scalars['ID'];
  type: SurveyTypes;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type MutationUpdateClosureInput = {
  uuid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
};

export type MutationDeleteClosureInput = {
  uuid: Scalars['ID'];
};

export enum SurveyStatuses {
  Unpublished = 'UNPUBLISHED',
  Published = 'PUBLISHED',
  Maintenance = 'MAINTENANCE'
}

export enum SurveyTypes {
  Question = 'QUESTION',
  Answer = 'ANSWER',
  Closure = 'CLOSURE',
  WelcomeScreen = 'WELCOME_SCREEN'
}

export enum QuestionTypes {
  Benchmarkable = 'BENCHMARKABLE',
  FileUpload = 'FILE_UPLOAD',
  ImageChoice = 'IMAGE_CHOICE',
  LikertScales = 'LIKERT_SCALES',
  OpenEnded = 'OPEN_ENDED',
  Ranking = 'RANKING',
  RatingScales = 'RATING_SCALES',
  SingleChoice = 'SINGLE_CHOICE',
  Slider = 'SLIDER',
  MultiChoices = 'MULTI_CHOICES'
}

export type GraphVertexValue = Question | Closure | Answer | WelcomeScreen;

export type Graph = {
  __typename?: 'Graph';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  vertices: Array<GraphVertex>;
  edges: Array<GraphEdge>;
};

export type GraphVertex = {
  __typename?: 'GraphVertex';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  graphId: Scalars['ID'];
  key: Scalars['String'];
  value?: Maybe<GraphVertexValue>;
};

export type GraphEdge = {
  __typename?: 'GraphEdge';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  graphId: Scalars['ID'];
  from: GraphVertex;
  to: GraphVertex;
  weight?: Maybe<Scalars['Int']>;
};

export type QueryReadGraphEdgeInput = {
  fromVertexKey: Scalars['ID'];
  toVertexKey: Scalars['ID'];
};

export type QueryReadGraphEdgesInput = {
  fromVertexKey?: Maybe<Scalars['ID']>;
  toVertexKey?: Maybe<Scalars['ID']>;
};

export type MutationCreateGraphEdgeInput = {
  fromVertexKey: Scalars['ID'];
  toVertexKey: Scalars['ID'];
};

export type MutationUpdateGraphEdgeInput = {
  fromVertexKey: Scalars['ID'];
  toVertexKey: Scalars['ID'];
  weight?: Maybe<Scalars['Int']>;
};

export type MutationDeleteGraphEdgeInput = {
  fromVertexKey: Scalars['ID'];
  toVertexKey: Scalars['ID'];
};

export type CustomerPaymentMethodDetailsCard = {
  __typename?: 'CustomerPaymentMethodDetailsCard';
  lastFourDigits: Scalars['String'];
  expMonth: Scalars['String'];
  expYear: Scalars['String'];
  fingerprint: Scalars['String'];
};

export type CustomerPaymentMethodDetailsAddress = {
  __typename?: 'CustomerPaymentMethodDetailsAddress';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type CustomerPaymentMethodDetails = {
  __typename?: 'CustomerPaymentMethodDetails';
  card: CustomerPaymentMethodDetailsCard;
  address: CustomerPaymentMethodDetailsAddress;
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type CustomerPaymentMethod = {
  __typename?: 'CustomerPaymentMethod';
  externalId: Scalars['String'];
  details: CustomerPaymentMethodDetails;
};

export type Customer = {
  __typename?: 'Customer';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  userId: Scalars['ID'];
  externalId: Scalars['ID'];
  currency: Scalars['String'];
  externalDefaultPaymentMethodId?: Maybe<Scalars['ID']>;
  paymentMethods: Array<CustomerPaymentMethod>;
  invoicePrefix?: Maybe<Scalars['String']>;
};

export type Product = {
  __typename?: 'Product';
  externalId: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
};

export type PriceRecurring = {
  __typename?: 'PriceRecurring';
  interval: Scalars['String'];
  intervalCount: Scalars['Int'];
};

export type Price = {
  __typename?: 'Price';
  externalId: Scalars['String'];
  nickname: Scalars['String'];
  currency: Scalars['String'];
  unitAmount: Scalars['Int'];
  recurring: PriceRecurring;
  metadata?: Maybe<Scalars['JSON']>;
};

export type Plan = {
  __typename?: 'Plan';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  name: Scalars['String'];
  description: Scalars['String'];
  isActive: Scalars['Boolean'];
  product: Product;
  price: Price;
  metadata: Scalars['JSON'];
};

export type SubscriptionItems = {
  __typename?: 'SubscriptionItems';
  externalId: Scalars['String'];
  externalPriceId: Scalars['String'];
  quantity: Scalars['Int'];
};

export type Subscription = {
  __typename?: 'Subscription';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  userId: Scalars['ID'];
  externalId: Scalars['String'];
  externalCustomerId: Scalars['String'];
  currentPeriodEnd: Scalars['Date'];
  items: Array<SubscriptionItems>;
  status: Scalars['String'];
  collectionMethod: Scalars['String'];
  externalLatestInvoiceId?: Maybe<Scalars['String']>;
  subPong?: Maybe<Scalars['String']>;
  greetings?: Maybe<Scalars['String']>;
};

export type MutationCreateSelfSubscriptionInput = {
  planId: Scalars['ID'];
  shouldSavePaymentMethod: Scalars['Boolean'];
};

export type MutationCreateSelfSubscriptionDetails = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type MutationCreateSelfSubscriptionCard = {
  number: Scalars['String'];
  expMonth: Scalars['Int'];
  expYear: Scalars['Int'];
  cvc: Scalars['String'];
};

export type MutationCreateSelfSubscriptionAddress = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type MutationUpdateSelfSubscriptionInput = {
  subscriptionId: Scalars['ID'];
  shouldSavePaymentMethod: Scalars['Boolean'];
  planId?: Maybe<Scalars['ID']>;
};

export type MutationUpdateSelfSubscriptionDetails = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type MutationUpdateSelfSubscriptionCard = {
  number?: Maybe<Scalars['String']>;
  expMonth?: Maybe<Scalars['Int']>;
  expYear?: Maybe<Scalars['Int']>;
  cvc?: Maybe<Scalars['String']>;
};

export type MutationUpdateSelfSubscriptionAddress = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type MutationCancelSelfSubscriptionInput = {
  subscriptionId: Scalars['ID'];
};

export type Question = {
  __typename?: 'Question';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  type: Scalars['String'];
  subType: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  data?: Maybe<Scalars['JSON']>;
  answers?: Maybe<Array<Answer>>;
};

export type QueryReadQuestionInput = {
  uuid: Scalars['ID'];
};

export type QueryReadQuestionsInput = {
  surveyId: Scalars['ID'];
};

export type MutationCreateQuestionInput = {
  surveyId: Scalars['ID'];
  name: Scalars['String'];
  subType: QuestionTypes;
  description?: Maybe<Scalars['String']>;
  isRequired: Scalars['Boolean'];
  data?: Maybe<Scalars['JSON']>;
};

export type MutationUpdateQuestionInput = {
  uuid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  subType?: Maybe<QuestionTypes>;
  description?: Maybe<Scalars['String']>;
  isRequired?: Maybe<Scalars['Boolean']>;
  data?: Maybe<Scalars['JSON']>;
};

export type MutationDeleteQuestionInput = {
  uuid: Scalars['ID'];
};

export type ResultData = {
  __typename?: 'ResultData';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  question: Question;
  answer: Scalars['JSON'];
};

export type Result = {
  __typename?: 'Result';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  data: Array<ResultData>;
  identifier?: Maybe<Scalars['String']>;
};

export type ResultDataInput = {
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  questionId: Scalars['ID'];
  answer: Scalars['JSON'];
};

export type QueryReadResultInput = {
  uuid: Scalars['ID'];
};

export type QueryReadResultsInput = {
  surveyId: Scalars['ID'];
};

export type MutationCreateResultInput = {
  surveyId: Scalars['ID'];
  data: Array<ResultDataInput>;
  identifier?: Maybe<Scalars['String']>;
};

export type MutationUpdateResultInput = {
  uuid: Scalars['ID'];
  identifier?: Maybe<Scalars['String']>;
};

export type MutationDeleteResultInput = {
  uuid: Scalars['ID'];
};



export type QuerySubPingInput = {
  message: Scalars['String'];
};

export type SurveyCustomization = {
  __typename?: 'SurveyCustomization';
  color: Scalars['String'];
};

export type Survey = {
  __typename?: 'Survey';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  status: SurveyStatuses;
  user: User;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  fillUrlQrCode?: Maybe<Scalars['String']>;
  graph: Graph;
  startingVertex?: Maybe<GraphVertex>;
  closingVertex?: Maybe<GraphVertex>;
  customization: SurveyCustomization;
};

export type SurveyValidationError = {
  __typename?: 'SurveyValidationError';
  vertexKey: Scalars['ID'];
  error: Scalars['String'];
};

export type QueryReadSurveyInput = {
  uuid: Scalars['ID'];
};

export type QueryValidateSurveyInput = {
  uuid: Scalars['ID'];
};

export type SurveyCustomizationInput = {
  color: Scalars['String'];
};

export type MutationCreateSurveyInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  customization?: Maybe<SurveyCustomizationInput>;
};

export type MutationUpdateSurveyInput = {
  uuid: Scalars['ID'];
  status?: Maybe<SurveyStatuses>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  customization?: Maybe<SurveyCustomizationInput>;
};

export type MutationDeleteSurveyInput = {
  uuid: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  provider?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['ID'];
};

export type QueryUserInput = {
  uuid: Scalars['ID'];
};

export type QueryDefaultAuthenticationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type MutationDefaultAuthenticationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type WelcomeScreen = {
  __typename?: 'WelcomeScreen';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  type: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type QueryReadWelcomeScreenInput = {
  uuid: Scalars['ID'];
};

export type QueryReadWelcomeScreensInput = {
  surveyId: Scalars['ID'];
};

export type MutationCreateWelcomeScreenInput = {
  surveyId: Scalars['ID'];
  parentWelcomeScreenId: Scalars['ID'];
  type: SurveyTypes;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type MutationUpdateWelcomeScreenInput = {
  uuid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
};

export type MutationDeleteWelcomeScreenInput = {
  uuid: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Answer: ResolverTypeWrapper<Answer>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  QueryReadAnswerInput: QueryReadAnswerInput;
  QueryReadAnswersInput: QueryReadAnswersInput;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  MutationCreateAnswerInput: MutationCreateAnswerInput;
  MutationUpdateAnswerInput: MutationUpdateAnswerInput;
  MutationDeleteAnswerInput: MutationDeleteAnswerInput;
  Mutation: ResolverTypeWrapper<{}>;
  Closure: ResolverTypeWrapper<Closure>;
  QueryReadClosureInput: QueryReadClosureInput;
  QueryReadClosuresInput: QueryReadClosuresInput;
  MutationCreateClosureInput: MutationCreateClosureInput;
  MutationUpdateClosureInput: MutationUpdateClosureInput;
  MutationDeleteClosureInput: MutationDeleteClosureInput;
  SurveyStatuses: SurveyStatuses;
  SurveyTypes: SurveyTypes;
  QuestionTypes: QuestionTypes;
  GraphVertexValue: ResolversTypes['Question'] | ResolversTypes['Closure'] | ResolversTypes['Answer'] | ResolversTypes['WelcomeScreen'];
  Graph: ResolverTypeWrapper<Graph>;
  GraphVertex: ResolverTypeWrapper<Omit<GraphVertex, 'value'> & { value?: Maybe<ResolversTypes['GraphVertexValue']> }>;
  GraphEdge: ResolverTypeWrapper<GraphEdge>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  QueryReadGraphEdgeInput: QueryReadGraphEdgeInput;
  QueryReadGraphEdgesInput: QueryReadGraphEdgesInput;
  MutationCreateGraphEdgeInput: MutationCreateGraphEdgeInput;
  MutationUpdateGraphEdgeInput: MutationUpdateGraphEdgeInput;
  MutationDeleteGraphEdgeInput: MutationDeleteGraphEdgeInput;
  CustomerPaymentMethodDetailsCard: ResolverTypeWrapper<CustomerPaymentMethodDetailsCard>;
  CustomerPaymentMethodDetailsAddress: ResolverTypeWrapper<CustomerPaymentMethodDetailsAddress>;
  CustomerPaymentMethodDetails: ResolverTypeWrapper<CustomerPaymentMethodDetails>;
  CustomerPaymentMethod: ResolverTypeWrapper<CustomerPaymentMethod>;
  Customer: ResolverTypeWrapper<Customer>;
  Product: ResolverTypeWrapper<Product>;
  PriceRecurring: ResolverTypeWrapper<PriceRecurring>;
  Price: ResolverTypeWrapper<Price>;
  Plan: ResolverTypeWrapper<Plan>;
  SubscriptionItems: ResolverTypeWrapper<SubscriptionItems>;
  Subscription: ResolverTypeWrapper<{}>;
  MutationCreateSelfSubscriptionInput: MutationCreateSelfSubscriptionInput;
  MutationCreateSelfSubscriptionDetails: MutationCreateSelfSubscriptionDetails;
  MutationCreateSelfSubscriptionCard: MutationCreateSelfSubscriptionCard;
  MutationCreateSelfSubscriptionAddress: MutationCreateSelfSubscriptionAddress;
  MutationUpdateSelfSubscriptionInput: MutationUpdateSelfSubscriptionInput;
  MutationUpdateSelfSubscriptionDetails: MutationUpdateSelfSubscriptionDetails;
  MutationUpdateSelfSubscriptionCard: MutationUpdateSelfSubscriptionCard;
  MutationUpdateSelfSubscriptionAddress: MutationUpdateSelfSubscriptionAddress;
  MutationCancelSelfSubscriptionInput: MutationCancelSelfSubscriptionInput;
  Question: ResolverTypeWrapper<Question>;
  QueryReadQuestionInput: QueryReadQuestionInput;
  QueryReadQuestionsInput: QueryReadQuestionsInput;
  MutationCreateQuestionInput: MutationCreateQuestionInput;
  MutationUpdateQuestionInput: MutationUpdateQuestionInput;
  MutationDeleteQuestionInput: MutationDeleteQuestionInput;
  ResultData: ResolverTypeWrapper<ResultData>;
  Result: ResolverTypeWrapper<Result>;
  ResultDataInput: ResultDataInput;
  QueryReadResultInput: QueryReadResultInput;
  QueryReadResultsInput: QueryReadResultsInput;
  MutationCreateResultInput: MutationCreateResultInput;
  MutationUpdateResultInput: MutationUpdateResultInput;
  MutationDeleteResultInput: MutationDeleteResultInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  QuerySubPingInput: QuerySubPingInput;
  SurveyCustomization: ResolverTypeWrapper<SurveyCustomization>;
  Survey: ResolverTypeWrapper<Survey>;
  SurveyValidationError: ResolverTypeWrapper<SurveyValidationError>;
  QueryReadSurveyInput: QueryReadSurveyInput;
  QueryValidateSurveyInput: QueryValidateSurveyInput;
  SurveyCustomizationInput: SurveyCustomizationInput;
  MutationCreateSurveyInput: MutationCreateSurveyInput;
  MutationUpdateSurveyInput: MutationUpdateSurveyInput;
  MutationDeleteSurveyInput: MutationDeleteSurveyInput;
  User: ResolverTypeWrapper<User>;
  QueryUserInput: QueryUserInput;
  QueryDefaultAuthenticationInput: QueryDefaultAuthenticationInput;
  MutationDefaultAuthenticationInput: MutationDefaultAuthenticationInput;
  WelcomeScreen: ResolverTypeWrapper<WelcomeScreen>;
  QueryReadWelcomeScreenInput: QueryReadWelcomeScreenInput;
  QueryReadWelcomeScreensInput: QueryReadWelcomeScreensInput;
  MutationCreateWelcomeScreenInput: MutationCreateWelcomeScreenInput;
  MutationUpdateWelcomeScreenInput: MutationUpdateWelcomeScreenInput;
  MutationDeleteWelcomeScreenInput: MutationDeleteWelcomeScreenInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Answer: Answer;
  ID: Scalars['ID'];
  String: Scalars['String'];
  QueryReadAnswerInput: QueryReadAnswerInput;
  QueryReadAnswersInput: QueryReadAnswersInput;
  Query: {};
  Boolean: Scalars['Boolean'];
  MutationCreateAnswerInput: MutationCreateAnswerInput;
  MutationUpdateAnswerInput: MutationUpdateAnswerInput;
  MutationDeleteAnswerInput: MutationDeleteAnswerInput;
  Mutation: {};
  Closure: Closure;
  QueryReadClosureInput: QueryReadClosureInput;
  QueryReadClosuresInput: QueryReadClosuresInput;
  MutationCreateClosureInput: MutationCreateClosureInput;
  MutationUpdateClosureInput: MutationUpdateClosureInput;
  MutationDeleteClosureInput: MutationDeleteClosureInput;
  GraphVertexValue: ResolversParentTypes['Question'] | ResolversParentTypes['Closure'] | ResolversParentTypes['Answer'] | ResolversParentTypes['WelcomeScreen'];
  Graph: Graph;
  GraphVertex: Omit<GraphVertex, 'value'> & { value?: Maybe<ResolversParentTypes['GraphVertexValue']> };
  GraphEdge: GraphEdge;
  Int: Scalars['Int'];
  QueryReadGraphEdgeInput: QueryReadGraphEdgeInput;
  QueryReadGraphEdgesInput: QueryReadGraphEdgesInput;
  MutationCreateGraphEdgeInput: MutationCreateGraphEdgeInput;
  MutationUpdateGraphEdgeInput: MutationUpdateGraphEdgeInput;
  MutationDeleteGraphEdgeInput: MutationDeleteGraphEdgeInput;
  CustomerPaymentMethodDetailsCard: CustomerPaymentMethodDetailsCard;
  CustomerPaymentMethodDetailsAddress: CustomerPaymentMethodDetailsAddress;
  CustomerPaymentMethodDetails: CustomerPaymentMethodDetails;
  CustomerPaymentMethod: CustomerPaymentMethod;
  Customer: Customer;
  Product: Product;
  PriceRecurring: PriceRecurring;
  Price: Price;
  Plan: Plan;
  SubscriptionItems: SubscriptionItems;
  Subscription: {};
  MutationCreateSelfSubscriptionInput: MutationCreateSelfSubscriptionInput;
  MutationCreateSelfSubscriptionDetails: MutationCreateSelfSubscriptionDetails;
  MutationCreateSelfSubscriptionCard: MutationCreateSelfSubscriptionCard;
  MutationCreateSelfSubscriptionAddress: MutationCreateSelfSubscriptionAddress;
  MutationUpdateSelfSubscriptionInput: MutationUpdateSelfSubscriptionInput;
  MutationUpdateSelfSubscriptionDetails: MutationUpdateSelfSubscriptionDetails;
  MutationUpdateSelfSubscriptionCard: MutationUpdateSelfSubscriptionCard;
  MutationUpdateSelfSubscriptionAddress: MutationUpdateSelfSubscriptionAddress;
  MutationCancelSelfSubscriptionInput: MutationCancelSelfSubscriptionInput;
  Question: Question;
  QueryReadQuestionInput: QueryReadQuestionInput;
  QueryReadQuestionsInput: QueryReadQuestionsInput;
  MutationCreateQuestionInput: MutationCreateQuestionInput;
  MutationUpdateQuestionInput: MutationUpdateQuestionInput;
  MutationDeleteQuestionInput: MutationDeleteQuestionInput;
  ResultData: ResultData;
  Result: Result;
  ResultDataInput: ResultDataInput;
  QueryReadResultInput: QueryReadResultInput;
  QueryReadResultsInput: QueryReadResultsInput;
  MutationCreateResultInput: MutationCreateResultInput;
  MutationUpdateResultInput: MutationUpdateResultInput;
  MutationDeleteResultInput: MutationDeleteResultInput;
  Date: Scalars['Date'];
  JSON: Scalars['JSON'];
  QuerySubPingInput: QuerySubPingInput;
  SurveyCustomization: SurveyCustomization;
  Survey: Survey;
  SurveyValidationError: SurveyValidationError;
  QueryReadSurveyInput: QueryReadSurveyInput;
  QueryValidateSurveyInput: QueryValidateSurveyInput;
  SurveyCustomizationInput: SurveyCustomizationInput;
  MutationCreateSurveyInput: MutationCreateSurveyInput;
  MutationUpdateSurveyInput: MutationUpdateSurveyInput;
  MutationDeleteSurveyInput: MutationDeleteSurveyInput;
  User: User;
  QueryUserInput: QueryUserInput;
  QueryDefaultAuthenticationInput: QueryDefaultAuthenticationInput;
  MutationDefaultAuthenticationInput: MutationDefaultAuthenticationInput;
  WelcomeScreen: WelcomeScreen;
  QueryReadWelcomeScreenInput: QueryReadWelcomeScreenInput;
  QueryReadWelcomeScreensInput: QueryReadWelcomeScreensInput;
  MutationCreateWelcomeScreenInput: MutationCreateWelcomeScreenInput;
  MutationUpdateWelcomeScreenInput: MutationUpdateWelcomeScreenInput;
  MutationDeleteWelcomeScreenInput: MutationDeleteWelcomeScreenInput;
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parentQuestionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  readAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryReadAnswerArgs, 'input'>>;
  readAnswers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryReadAnswersArgs, 'input'>>;
  readClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<QueryReadClosureArgs, 'input'>>;
  readClosures?: Resolver<Array<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<QueryReadClosuresArgs, 'input'>>;
  readGraphEdge?: Resolver<Maybe<ResolversTypes['GraphEdge']>, ParentType, ContextType, RequireFields<QueryReadGraphEdgeArgs, 'input'>>;
  readGraphEdges?: Resolver<Array<ResolversTypes['GraphEdge']>, ParentType, ContextType, RequireFields<QueryReadGraphEdgesArgs, 'input'>>;
  readPlans?: Resolver<Array<ResolversTypes['Plan']>, ParentType, ContextType>;
  readSelfCustomer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  readSelfSubscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType>;
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  readQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryReadQuestionArgs, 'input'>>;
  readQuestions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryReadQuestionsArgs, 'input'>>;
  readResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryReadResultArgs, 'input'>>;
  readResults?: Resolver<Array<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<QueryReadResultsArgs, 'input'>>;
  subPing?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QuerySubPingArgs, 'input'>>;
  readSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<QueryReadSurveyArgs, 'input'>>;
  readSurveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<QueryReadSurveysArgs, never>>;
  validateSurvey?: Resolver<Maybe<Array<Maybe<ResolversTypes['SurveyValidationError']>>>, ParentType, ContextType, RequireFields<QueryValidateSurveyArgs, 'input'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  defaultAuthentication?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryDefaultAuthenticationArgs, 'input'>>;
  deauthentication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  readWelcomeScreen?: Resolver<Maybe<ResolversTypes['WelcomeScreen']>, ParentType, ContextType, RequireFields<QueryReadWelcomeScreenArgs, 'input'>>;
  readWelcomeScreens?: Resolver<Array<ResolversTypes['WelcomeScreen']>, ParentType, ContextType, RequireFields<QueryReadWelcomeScreensArgs, 'input'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationCreateAnswerArgs, 'input'>>;
  updateAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationUpdateAnswerArgs, 'input'>>;
  deleteAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationDeleteAnswerArgs, 'input'>>;
  createClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationCreateClosureArgs, 'input'>>;
  updateClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationUpdateClosureArgs, 'input'>>;
  deleteClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationDeleteClosureArgs, 'input'>>;
  createGraphEdge?: Resolver<Maybe<ResolversTypes['GraphEdge']>, ParentType, ContextType, RequireFields<MutationCreateGraphEdgeArgs, 'input'>>;
  updateGraphEdge?: Resolver<Maybe<ResolversTypes['GraphEdge']>, ParentType, ContextType, RequireFields<MutationUpdateGraphEdgeArgs, 'input'>>;
  deleteGraphEdge?: Resolver<Maybe<ResolversTypes['GraphEdge']>, ParentType, ContextType, RequireFields<MutationDeleteGraphEdgeArgs, 'input'>>;
  createSelfSubscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType, RequireFields<MutationCreateSelfSubscriptionArgs, 'input' | 'details' | 'card' | 'address'>>;
  updateSelfSubscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType, RequireFields<MutationUpdateSelfSubscriptionArgs, 'input' | 'details' | 'card' | 'address'>>;
  cancelSelfSubscription?: Resolver<Maybe<ResolversTypes['Subscription']>, ParentType, ContextType, RequireFields<MutationCancelSelfSubscriptionArgs, never>>;
  createQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, 'input'>>;
  updateQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationUpdateQuestionArgs, 'input'>>;
  deleteQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationDeleteQuestionArgs, 'input'>>;
  createResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationCreateResultArgs, 'input'>>;
  updateResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationUpdateResultArgs, 'input'>>;
  deleteResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, RequireFields<MutationDeleteResultArgs, 'input'>>;
  createSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationCreateSurveyArgs, 'input'>>;
  updateSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationUpdateSurveyArgs, 'input'>>;
  deleteSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationDeleteSurveyArgs, 'input'>>;
  defaultAuthentication?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDefaultAuthenticationArgs, 'input'>>;
  createWelcomeScreen?: Resolver<Maybe<ResolversTypes['WelcomeScreen']>, ParentType, ContextType, RequireFields<MutationCreateWelcomeScreenArgs, 'input'>>;
  updateWelcomeScreen?: Resolver<Maybe<ResolversTypes['WelcomeScreen']>, ParentType, ContextType, RequireFields<MutationUpdateWelcomeScreenArgs, 'input'>>;
  deleteWelcomeScreen?: Resolver<Maybe<ResolversTypes['WelcomeScreen']>, ParentType, ContextType, RequireFields<MutationDeleteWelcomeScreenArgs, 'input'>>;
};

export type ClosureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Closure'] = ResolversParentTypes['Closure']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphVertexValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphVertexValue'] = ResolversParentTypes['GraphVertexValue']> = {
  __resolveType: TypeResolveFn<'Question' | 'Closure' | 'Answer' | 'WelcomeScreen', ParentType, ContextType>;
};

export type GraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['Graph'] = ResolversParentTypes['Graph']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  vertices?: Resolver<Array<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['GraphEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphVertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphVertex'] = ResolversParentTypes['GraphVertex']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  graphId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['GraphVertexValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphEdge'] = ResolversParentTypes['GraphEdge']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  graphId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['GraphVertex'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['GraphVertex'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPaymentMethodDetailsCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerPaymentMethodDetailsCard'] = ResolversParentTypes['CustomerPaymentMethodDetailsCard']> = {
  lastFourDigits?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expMonth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expYear?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fingerprint?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPaymentMethodDetailsAddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerPaymentMethodDetailsAddress'] = ResolversParentTypes['CustomerPaymentMethodDetailsAddress']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  line1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  line2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPaymentMethodDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerPaymentMethodDetails'] = ResolversParentTypes['CustomerPaymentMethodDetails']> = {
  card?: Resolver<ResolversTypes['CustomerPaymentMethodDetailsCard'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['CustomerPaymentMethodDetailsAddress'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPaymentMethodResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerPaymentMethod'] = ResolversParentTypes['CustomerPaymentMethod']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['CustomerPaymentMethodDetails'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  externalId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalDefaultPaymentMethodId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  paymentMethods?: Resolver<Array<ResolversTypes['CustomerPaymentMethod']>, ParentType, ContextType>;
  invoicePrefix?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceRecurringResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceRecurring'] = ResolversParentTypes['PriceRecurring']> = {
  interval?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  intervalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  unitAmount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recurring?: Resolver<ResolversTypes['PriceRecurring'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlanResolvers<ContextType = any, ParentType extends ResolversParentTypes['Plan'] = ResolversParentTypes['Plan']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Price'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionItemsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscriptionItems'] = ResolversParentTypes['SubscriptionItems']> = {
  externalId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  externalPriceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  uuid?: SubscriptionResolver<ResolversTypes['ID'], "uuid", ParentType, ContextType>;
  createdAt?: SubscriptionResolver<ResolversTypes['Date'], "createdAt", ParentType, ContextType>;
  updatedAt?: SubscriptionResolver<ResolversTypes['Date'], "updatedAt", ParentType, ContextType>;
  userId?: SubscriptionResolver<ResolversTypes['ID'], "userId", ParentType, ContextType>;
  externalId?: SubscriptionResolver<ResolversTypes['String'], "externalId", ParentType, ContextType>;
  externalCustomerId?: SubscriptionResolver<ResolversTypes['String'], "externalCustomerId", ParentType, ContextType>;
  currentPeriodEnd?: SubscriptionResolver<ResolversTypes['Date'], "currentPeriodEnd", ParentType, ContextType>;
  items?: SubscriptionResolver<Array<ResolversTypes['SubscriptionItems']>, "items", ParentType, ContextType>;
  status?: SubscriptionResolver<ResolversTypes['String'], "status", ParentType, ContextType>;
  collectionMethod?: SubscriptionResolver<ResolversTypes['String'], "collectionMethod", ParentType, ContextType>;
  externalLatestInvoiceId?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "externalLatestInvoiceId", ParentType, ContextType>;
  subPong?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "subPong", ParentType, ContextType>;
  greetings?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "greetings", ParentType, ContextType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isRequired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<ResolversTypes['Answer']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResultData'] = ResolversParentTypes['ResultData']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['Question'], ParentType, ContextType>;
  answer?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  data?: Resolver<Array<ResolversTypes['ResultData']>, ParentType, ContextType>;
  identifier?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type SurveyCustomizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurveyCustomization'] = ResolversParentTypes['SurveyCustomization']> = {
  color?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SurveyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SurveyStatuses'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fillUrlQrCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  graph?: Resolver<ResolversTypes['Graph'], ParentType, ContextType>;
  startingVertex?: Resolver<Maybe<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  closingVertex?: Resolver<Maybe<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  customization?: Resolver<ResolversTypes['SurveyCustomization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SurveyValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['SurveyValidationError'] = ResolversParentTypes['SurveyValidationError']> = {
  vertexKey?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  providerId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WelcomeScreenResolvers<ContextType = any, ParentType extends ResolversParentTypes['WelcomeScreen'] = ResolversParentTypes['WelcomeScreen']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Closure?: ClosureResolvers<ContextType>;
  GraphVertexValue?: GraphVertexValueResolvers<ContextType>;
  Graph?: GraphResolvers<ContextType>;
  GraphVertex?: GraphVertexResolvers<ContextType>;
  GraphEdge?: GraphEdgeResolvers<ContextType>;
  CustomerPaymentMethodDetailsCard?: CustomerPaymentMethodDetailsCardResolvers<ContextType>;
  CustomerPaymentMethodDetailsAddress?: CustomerPaymentMethodDetailsAddressResolvers<ContextType>;
  CustomerPaymentMethodDetails?: CustomerPaymentMethodDetailsResolvers<ContextType>;
  CustomerPaymentMethod?: CustomerPaymentMethodResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  PriceRecurring?: PriceRecurringResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Plan?: PlanResolvers<ContextType>;
  SubscriptionItems?: SubscriptionItemsResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  ResultData?: ResultDataResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  SurveyCustomization?: SurveyCustomizationResolvers<ContextType>;
  Survey?: SurveyResolvers<ContextType>;
  SurveyValidationError?: SurveyValidationErrorResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WelcomeScreen?: WelcomeScreenResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
