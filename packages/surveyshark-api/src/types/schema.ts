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
  type: SurveyTypes;
  subType: QuestionTypes;
  displayText: Scalars['String'];
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
  test: Scalars['String'];
  ping: Scalars['String'];
  readQuestion?: Maybe<Question>;
  readQuestions: Array<Question>;
  readSurvey?: Maybe<Survey>;
  readSurveys: Array<Survey>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  defaultAuthentication?: Maybe<User>;
  deauthentication: Scalars['Boolean'];
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


export type QueryReadQuestionArgs = {
  input: QueryReadQuestionInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadQuestionsArgs = {
  input: QueryReadQuestionsInput;
  withAnswers?: Maybe<Scalars['Boolean']>;
};


export type QueryReadSurveyArgs = {
  input: QueryReadSurveyInput;
};


export type QueryReadSurveysArgs = {
  withData?: Maybe<Scalars['Boolean']>;
};


export type QueryUserArgs = {
  input: QueryUserInput;
};


export type QueryDefaultAuthenticationArgs = {
  input: QueryDefaultAuthenticationInput;
};

export type MutationCreateAnswerInput = {
  surveyId: Scalars['ID'];
  parentQuestionId: Scalars['ID'];
  displayText: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
};

export type MutationUpdateAnswerInput = {
  uuid: Scalars['ID'];
  displayText: Scalars['String'];
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
  createQuestion?: Maybe<Question>;
  updateQuestion?: Maybe<Question>;
  deleteQuestion?: Maybe<Question>;
  createSurvey?: Maybe<Survey>;
  updateSurvey?: Maybe<Survey>;
  deleteSurvey?: Maybe<Survey>;
  defaultAuthentication?: Maybe<User>;
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


export type MutationCreateQuestionArgs = {
  input: MutationCreateQuestionInput;
};


export type MutationUpdateQuestionArgs = {
  input: MutationUpdateQuestionInput;
};


export type MutationDeleteQuestionArgs = {
  input: MutationDeleteQuestionInput;
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

export type Closure = {
  __typename?: 'Closure';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  type: SurveyTypes;
  displayText: Scalars['String'];
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
  displayText: Scalars['String'];
};

export type MutationUpdateClosureInput = {
  uuid: Scalars['ID'];
  displayText: Scalars['String'];
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
  Closure = 'CLOSURE'
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

export type Question = {
  __typename?: 'Question';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  surveyId: Scalars['ID'];
  type: SurveyTypes;
  subType: QuestionTypes;
  displayText: Scalars['String'];
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
  displayText: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
};

export type MutationUpdateQuestionInput = {
  uuid: Scalars['ID'];
  displayText: Scalars['String'];
  data?: Maybe<Scalars['JSON']>;
};

export type MutationDeleteQuestionInput = {
  uuid: Scalars['ID'];
};



export type Subscription = {
  __typename?: 'Subscription';
  hello: Scalars['String'];
};


export type SubscriptionHelloArgs = {
  name: Scalars['String'];
};

export type GraphVertexValue = Question | Closure | Answer;

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
  value: GraphVertexValue;
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

export type Survey = {
  __typename?: 'Survey';
  uuid: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  status: SurveyStatuses;
  user: User;
  name: Scalars['String'];
  graph: Graph;
  startingVertex?: Maybe<GraphVertex>;
  closingVertex?: Maybe<GraphVertex>;
};

export type QueryReadSurveyInput = {
  uuid: Scalars['ID'];
};

export type MutationCreateSurveyInput = {
  name: Scalars['String'];
};

export type MutationUpdateSurveyInput = {
  uuid: Scalars['ID'];
  status?: Maybe<SurveyStatuses>;
  name: Scalars['String'];
  displayText?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
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
  Question: ResolverTypeWrapper<Question>;
  QueryReadQuestionInput: QueryReadQuestionInput;
  QueryReadQuestionsInput: QueryReadQuestionsInput;
  MutationCreateQuestionInput: MutationCreateQuestionInput;
  MutationUpdateQuestionInput: MutationUpdateQuestionInput;
  MutationDeleteQuestionInput: MutationDeleteQuestionInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Subscription: ResolverTypeWrapper<{}>;
  GraphVertexValue: ResolversTypes['Question'] | ResolversTypes['Closure'] | ResolversTypes['Answer'];
  Graph: ResolverTypeWrapper<Graph>;
  GraphVertex: ResolverTypeWrapper<Omit<GraphVertex, 'value'> & { value: ResolversTypes['GraphVertexValue'] }>;
  GraphEdge: ResolverTypeWrapper<GraphEdge>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Survey: ResolverTypeWrapper<Survey>;
  QueryReadSurveyInput: QueryReadSurveyInput;
  MutationCreateSurveyInput: MutationCreateSurveyInput;
  MutationUpdateSurveyInput: MutationUpdateSurveyInput;
  MutationDeleteSurveyInput: MutationDeleteSurveyInput;
  User: ResolverTypeWrapper<User>;
  QueryUserInput: QueryUserInput;
  QueryDefaultAuthenticationInput: QueryDefaultAuthenticationInput;
  MutationDefaultAuthenticationInput: MutationDefaultAuthenticationInput;
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
  Question: Question;
  QueryReadQuestionInput: QueryReadQuestionInput;
  QueryReadQuestionsInput: QueryReadQuestionsInput;
  MutationCreateQuestionInput: MutationCreateQuestionInput;
  MutationUpdateQuestionInput: MutationUpdateQuestionInput;
  MutationDeleteQuestionInput: MutationDeleteQuestionInput;
  Date: Scalars['Date'];
  JSON: Scalars['JSON'];
  Subscription: {};
  GraphVertexValue: ResolversParentTypes['Question'] | ResolversParentTypes['Closure'] | ResolversParentTypes['Answer'];
  Graph: Graph;
  GraphVertex: Omit<GraphVertex, 'value'> & { value: ResolversParentTypes['GraphVertexValue'] };
  GraphEdge: GraphEdge;
  Int: Scalars['Int'];
  Survey: Survey;
  QueryReadSurveyInput: QueryReadSurveyInput;
  MutationCreateSurveyInput: MutationCreateSurveyInput;
  MutationUpdateSurveyInput: MutationUpdateSurveyInput;
  MutationDeleteSurveyInput: MutationDeleteSurveyInput;
  User: User;
  QueryUserInput: QueryUserInput;
  QueryDefaultAuthenticationInput: QueryDefaultAuthenticationInput;
  MutationDefaultAuthenticationInput: MutationDefaultAuthenticationInput;
};

export type AnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Answer'] = ResolversParentTypes['Answer']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  parentQuestionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SurveyTypes'], ParentType, ContextType>;
  subType?: Resolver<ResolversTypes['QuestionTypes'], ParentType, ContextType>;
  displayText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  readAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryReadAnswerArgs, 'input'>>;
  readAnswers?: Resolver<Array<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<QueryReadAnswersArgs, 'input'>>;
  readClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<QueryReadClosureArgs, 'input'>>;
  readClosures?: Resolver<Array<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<QueryReadClosuresArgs, 'input'>>;
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  readQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryReadQuestionArgs, 'input'>>;
  readQuestions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<QueryReadQuestionsArgs, 'input'>>;
  readSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<QueryReadSurveyArgs, 'input'>>;
  readSurveys?: Resolver<Array<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<QueryReadSurveysArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'input'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  defaultAuthentication?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryDefaultAuthenticationArgs, 'input'>>;
  deauthentication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationCreateAnswerArgs, 'input'>>;
  updateAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationUpdateAnswerArgs, 'input'>>;
  deleteAnswer?: Resolver<Maybe<ResolversTypes['Answer']>, ParentType, ContextType, RequireFields<MutationDeleteAnswerArgs, 'input'>>;
  createClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationCreateClosureArgs, 'input'>>;
  updateClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationUpdateClosureArgs, 'input'>>;
  deleteClosure?: Resolver<Maybe<ResolversTypes['Closure']>, ParentType, ContextType, RequireFields<MutationDeleteClosureArgs, 'input'>>;
  createQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationCreateQuestionArgs, 'input'>>;
  updateQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationUpdateQuestionArgs, 'input'>>;
  deleteQuestion?: Resolver<Maybe<ResolversTypes['Question']>, ParentType, ContextType, RequireFields<MutationDeleteQuestionArgs, 'input'>>;
  createSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationCreateSurveyArgs, 'input'>>;
  updateSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationUpdateSurveyArgs, 'input'>>;
  deleteSurvey?: Resolver<Maybe<ResolversTypes['Survey']>, ParentType, ContextType, RequireFields<MutationDeleteSurveyArgs, 'input'>>;
  defaultAuthentication?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDefaultAuthenticationArgs, 'input'>>;
};

export type ClosureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Closure'] = ResolversParentTypes['Closure']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SurveyTypes'], ParentType, ContextType>;
  displayText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QuestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  surveyId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['SurveyTypes'], ParentType, ContextType>;
  subType?: Resolver<ResolversTypes['QuestionTypes'], ParentType, ContextType>;
  displayText?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  answers?: Resolver<Maybe<Array<ResolversTypes['Answer']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  hello?: SubscriptionResolver<ResolversTypes['String'], "hello", ParentType, ContextType, RequireFields<SubscriptionHelloArgs, 'name'>>;
};

export type GraphVertexValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphVertexValue'] = ResolversParentTypes['GraphVertexValue']> = {
  __resolveType: TypeResolveFn<'Question' | 'Closure' | 'Answer', ParentType, ContextType>;
};

export type GraphResolvers<ContextType = any, ParentType extends ResolversParentTypes['Graph'] = ResolversParentTypes['Graph']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  vertices?: Resolver<Array<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  edges?: Resolver<Array<ResolversTypes['GraphEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GraphVertexResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphVertex'] = ResolversParentTypes['GraphVertex']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  graphId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['GraphVertexValue'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GraphEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['GraphEdge'] = ResolversParentTypes['GraphEdge']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  graphId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['GraphVertex'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['GraphVertex'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SurveyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Survey'] = ResolversParentTypes['Survey']> = {
  uuid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['SurveyStatuses'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  graph?: Resolver<ResolversTypes['Graph'], ParentType, ContextType>;
  startingVertex?: Resolver<Maybe<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  closingVertex?: Resolver<Maybe<ResolversTypes['GraphVertex']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Answer?: AnswerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Closure?: ClosureResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Date?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Subscription?: SubscriptionResolvers<ContextType>;
  GraphVertexValue?: GraphVertexValueResolvers<ContextType>;
  Graph?: GraphResolvers<ContextType>;
  GraphVertex?: GraphVertexResolvers<ContextType>;
  GraphEdge?: GraphEdgeResolvers<ContextType>;
  Survey?: SurveyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
