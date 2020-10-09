import { SurveyStatuses } from '../../types';
import { Answer, AnswerDocument } from '../answers';
import { Base, BaseDocument } from '../base';
import { GraphVertex, GraphVertexDocument } from '../graph_vertices';
import { Graph, GraphDocument } from '../graphs';
import { Question, QuestionDocument } from '../questions';
import { Closure, ClosureDocument } from '../closures';
import { User, UserDocument } from '../users';
import { WelcomeScreen, WelcomeScreenDocument } from '../welcome_screens';

export interface Survey<T = Question, K = Closure, R = Question | Answer | Closure | WelcomeScreen> extends Base {
  status: SurveyStatuses,
  user: User;
  name: string;
  description?: string;
  fillUrlQrCode?: string;
  graph: Graph<R>;
  startingVertex: GraphVertex<T>;
  closingVertex: GraphVertex<K>;
  customization: {
    color: string;
  };
}

export interface SurveyDocument<T = QuestionDocument, K = ClosureDocument, R = QuestionDocument | AnswerDocument | ClosureDocument | WelcomeScreenDocument> extends Survey<T, K, R>, BaseDocument {
  user: UserDocument;
  graph: GraphDocument<R>;
  startingVertex: GraphVertexDocument<T>;
  closingVertex: GraphVertexDocument<K>;
}
