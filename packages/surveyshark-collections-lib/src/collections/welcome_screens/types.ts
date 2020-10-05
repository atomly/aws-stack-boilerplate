import { SurveyTypes } from '../../types';
import { Base, BaseDocument } from '../base';
import { Survey } from '../surveys';

export interface WelcomeScreen extends Base {
  surveyId: Survey['uuid'];
  type: SurveyTypes.WELCOME_SCREEN;
  name: string;
  description?: string;
}

export type WelcomeScreenDocument = WelcomeScreen & BaseDocument;
