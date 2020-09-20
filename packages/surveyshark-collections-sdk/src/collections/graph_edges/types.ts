import { BaseDocument } from '../base';
import { GraphVertexDocument } from '../graph_vertices';

export interface GraphEdgeDocument extends BaseDocument {
  graphId: string;
  from: GraphVertexDocument;
  to: GraphVertexDocument;
  weight?: number;
}
