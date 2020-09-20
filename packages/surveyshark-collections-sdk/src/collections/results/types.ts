import { BaseDocument } from '../base';
import { SurveyDocument } from '../surveys';
import { QuestionDocument } from '../questions';

export interface ResultDocument extends BaseDocument {
  surveyId: SurveyDocument['uuid'];
  data: Array<{
    question: QuestionDocument;
    answer: unknown; // TODO: Answer types will depend on the question types.
  }>;
  identifier?: string;
}
