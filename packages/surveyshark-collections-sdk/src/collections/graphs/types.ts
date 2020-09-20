import { BaseDocument } from '../base';
import { GraphVertexDocument } from '../graph_vertices';
import { GraphEdgeDocument } from '../graph_edges';

export interface GraphDocument extends BaseDocument {
  vertices: GraphVertexDocument[];
  edges: GraphEdgeDocument[];
}
