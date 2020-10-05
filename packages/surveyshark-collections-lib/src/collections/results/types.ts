import { Base, BaseDocument } from '../base';
import { Survey } from '../surveys';
import { Question, QuestionDocument } from '../questions';

export interface Result extends Base {
  surveyId: Survey['uuid'];
  data: Array<{
    question: Question;
    answer: unknown; // TODO: Answer types will depend on the question types.
  }>;
  identifier?: string;
}

export interface ResultDocument extends Result, BaseDocument {
  data: Array<{
    question: QuestionDocument;
    answer: unknown; // TODO: Answer types will depend on the question types.
  }>;
}
