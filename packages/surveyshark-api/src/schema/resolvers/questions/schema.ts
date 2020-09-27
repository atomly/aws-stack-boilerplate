import gql from 'graphql-tag';

export default gql`
type Question {
  uuid: ID!
  createdAt: Date!
  updatedAt: Date!
  surveyId: ID!
  type: SurveyTypes!
  subType: QuestionTypes!
  displayText: String!
  data: JSON
  answers: [Answer!]
}

input QueryReadQuestionInput {
  uuid: ID!
}

input QueryReadQuestionsInput {
  surveyId: ID!
}

type Query {
  readQuestion(input: QueryReadQuestionInput!, withAnswers: Boolean): Question
  readQuestions(input: QueryReadQuestionsInput!, withAnswers: Boolean): [Question!]!
}

input MutationCreateQuestionInput {
  surveyId: ID!
  displayText: String!
  data: JSON
}

input MutationUpdateQuestionInput {
  uuid: ID!
  displayText: String!
  data: JSON
}

input  MutationDeleteQuestionInput {
  uuid: ID!
}

type Mutation {
  createQuestion(input: MutationCreateQuestionInput!): Question
  updateQuestion(input: MutationUpdateQuestionInput!): Question
  deleteQuestion(input: MutationDeleteQuestionInput!): Question
}
`;
