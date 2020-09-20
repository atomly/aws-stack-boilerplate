import { SurveyStatuses } from '../../types';
import { BaseDocument } from '../base';
import { UserDocument } from '../users';
import { GraphVertexDocument } from '../graph_vertices';
import { GraphDocument } from '../graphs';

export interface SurveyDocument extends BaseDocument {
  status: SurveyStatuses,
  user: UserDocument;
  graph: GraphDocument;
  startingVertex: GraphVertexDocument;
  closingVertex: GraphVertexDocument;
}
