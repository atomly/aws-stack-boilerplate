import { SurveyTypes } from '../../types';
import { Base, BaseDocument } from '../base';
import { Survey } from '../surveys';

export interface Closure extends Base {
  surveyId: Survey['uuid'];
  type: SurveyTypes.CLOSURE;
  name: string;
  description?: string;
}

export type ClosureDocument = Closure & BaseDocument;
