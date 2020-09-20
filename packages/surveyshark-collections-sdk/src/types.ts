export enum SurveyStatuses {
  UNPUBLISHED = 'unpublished',
  PUBLISHED = 'published',
  MAINTENANCE = 'maintenance',
}

export enum SurveyTypes {
  QUESTION = 'question',
  ANSWER = 'answer',
  CLOSURE = 'closure',
}

export enum QuestionTypes {
  BENCHMARKABLE = 'benchmarkable',
  FILE_UPLOAD = 'file_upload',
  IMAGE_CHOICE = 'image_choice',
  LIKERT_SCALES = 'likert_scales',
  OPEN_ENDED = 'open_ended',
  RANKING = 'ranking',
  RATING_SCALES = 'rating_scales',
  SINGLE_CHOICE = 'single_choice',
  SLIDER = 'slider',
  MULTI_CHOICES = 'multi_choices',
}
