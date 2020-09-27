import gql from 'graphql-tag';

export default gql`
enum SurveyStatuses {
  UNPUBLISHED
  PUBLISHED
  MAINTENANCE
}

enum SurveyTypes {
  QUESTION
  ANSWER
  CLOSURE
}

enum QuestionTypes {
  BENCHMARKABLE
  FILE_UPLOAD
  IMAGE_CHOICE
  LIKERT_SCALES
  OPEN_ENDED
  RANKING
  RATING_SCALES
  SINGLE_CHOICE
  SLIDER
  MULTI_CHOICES
}
`;
